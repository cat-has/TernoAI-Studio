import { useState, useEffect } from 'react'
import { importProduct, generateStill, generateVideo, makeCaption, POSES } from './ai'
import './styles.css'

const uid = () => Math.random().toString(36).slice(2, 9)

function usePersisted(key, init) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key)
      return s ? JSON.parse(s) : init
    } catch {
      return init
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)) } catch {}
  }, [key, v])
  return [v, setV]
}

function download(filename, href) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
}

const emptyForm = { link: '', title: '', price: '', image: '' }

export default function App() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = usePersisted('terno.products', [])
  const [character, setCharacter] = usePersisted('terno.character', { name: '', description: '', seed: 1234, locked: false })
  const [jobs, setJobs] = usePersisted('terno.jobs', [])

  const patchJob = (id, patch) => setJobs((js) => js.map((j) => (j.id === id ? { ...j, ...patch } : j)))

  async function runJob(job) {
    const product = products.find((p) => p.id === job.productId)
    if (!product) return patchJob(job.id, { status: 'failed', error: 'Product was removed.' })
    patchJob(job.id, { status: 'generating', error: '' })
    try {
      const still = await generateStill({ character, product, pose: job.pose })
      patchJob(job.id, { still })
      const video = await generateVideo({ still, pose: job.pose })
      patchJob(job.id, { status: 'done', video })
    } catch (e) {
      patchJob(job.id, { status: 'failed', error: String(e.message || e) })
    }
  }

  async function runAll() {
    for (const j of jobs.filter((x) => x.status === 'queued' || x.status === 'failed')) await runJob(j)
  }

  function exportJob(job) {
    const product = products.find((p) => p.id === job.productId) || {}
    const base = (product.title || 'video').replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-' + job.id
    if (job.still) download(base + '-still.svg', job.still)
    download(base + '-caption.txt', 'data:text/plain;charset=utf-8,' + encodeURIComponent(makeCaption(product)))
    if (job.video?.url) download(base + '.mp4', job.video.url)
  }

  const queuedCount = jobs.filter((j) => j.status === 'queued' || j.status === 'failed').length

  return (
    <div className="app">
      <header>
        <h1>TernoAI Studio</h1>
        <p>{products.length} products, {jobs.filter((j) => j.status === 'done').length} videos ready</p>
      </header>
      <main>
        {tab === 'products' && (
          <Products products={products} setProducts={setProducts} jobs={jobs} setJobs={setJobs} character={character} goCharacter={() => setTab('character')} goQueue={() => setTab('queue')} />
        )}
        {tab === 'character' && <Character character={character} setCharacter={setCharacter} />}
        {tab === 'queue' && (
          <Queue jobs={jobs} products={products} setJobs={setJobs} runJob={runJob} runAll={runAll} exportJob={exportJob} queuedCount={queuedCount} />
        )}
      </main>
      <nav>
        {[['products', 'Products'], ['character', 'Character'], ['queue', 'Queue']].map(([k, label]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
            {label}{k === 'queue' && jobs.length ? ` (${jobs.length})` : ''}
          </button>
        ))}
      </nav>
    </div>
  )
}

function Products({ products, setProducts, jobs, setJobs, character, goCharacter, goQueue }) {
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [pose, setPose] = useState(POSES[0])
  const [count, setCount] = useState(1)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function fetchDetails() {
    if (!form.link) return
    setBusy(true)
    const d = await importProduct(form.link)
    setForm((f) => ({ ...f, title: d.title || f.title, price: d.price || f.price, image: d.image || f.image }))
    setBusy(false)
  }

  function save() {
    if (!form.title.trim()) return
    setProducts([{ id: uid(), ...form }, ...products])
    setForm(emptyForm)
  }

  function queue(p) {
    if (!character.locked) return goCharacter()
    const added = Array.from({ length: count }, () => ({ id: uid(), productId: p.id, pose, status: 'queued', still: '', video: null, error: '' }))
    setJobs([...added, ...jobs])
    goQueue()
  }

  return (
    <section>
      <h2>Add a product</h2>
      <div className="card">
        <label>TikTok Shop link<input value={form.link} onChange={set('link')} placeholder="https://..." inputMode="url" /></label>
        <button className="ghost" onClick={fetchDetails} disabled={busy || !form.link}>{busy ? 'Fetching...' : 'Fetch details'}</button>
        <label>Name<input value={form.title} onChange={set('title')} placeholder="Pink terno set" /></label>
        <label>Price<input value={form.price} onChange={set('price')} placeholder="PHP 399" /></label>
        <label>Product photo URL<input value={form.image} onChange={set('image')} placeholder="https://..." inputMode="url" /></label>
        <button onClick={save} disabled={!form.title.trim()}>Save product</button>
      </div>

      <h2>Your products</h2>
      {products.length === 0 && <p className="empty">No products yet. Add one above to start a video.</p>}
      {products.length > 0 && (
        <div className="card row">
          <label>Pose<select value={pose} onChange={(e) => setPose(e.target.value)}>{POSES.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>Variations<select value={count} onChange={(e) => setCount(+e.target.value)}>{[1, 2, 3, 5, 10].map((n) => <option key={n}>{n}</option>)}</select></label>
        </div>
      )}
      {products.map((p) => (
        <div className="card item" key={p.id}>
          {p.image ? <img src={p.image} alt="" /> : <div className="thumb" />}
          <div className="grow">
            <strong>{p.title}</strong>
            <span>{p.price}</span>
          </div>
          <button onClick={() => queue(p)}>Queue video</button>
          <button className="ghost" onClick={() => setProducts(products.filter((x) => x.id !== p.id))}>Remove</button>
        </div>
      ))}
    </section>
  )
}

function Character({ character, setCharacter }) {
  const set = (k) => (e) => setCharacter({ ...character, [k]: e.target.value })
  return (
    <section>
      <h2>Model character</h2>
      <p className="note">Use a fully synthetic character. Describe her here instead of uploading photos of a real child. Locking keeps the seed and description the same for every video.</p>
      <div className="card">
        <label>Name<input value={character.name} onChange={set('name')} placeholder="Mina" disabled={character.locked} /></label>
        <label>Look description<textarea rows="5" value={character.description} onChange={set('description')} placeholder="Girl model, shoulder-length black hair with bangs, warm skin tone, round face, brown eyes, slim build" disabled={character.locked} /></label>
        <label>Seed<input type="number" value={character.seed} onChange={(e) => setCharacter({ ...character, seed: +e.target.value })} disabled={character.locked} /></label>
        {character.locked ? (
          <button className="ghost" onClick={() => setCharacter({ ...character, locked: false })}>Unlock to edit</button>
        ) : (
          <button onClick={() => setCharacter({ ...character, locked: true })} disabled={!character.name.trim() || !character.description.trim()}>Lock character</button>
        )}
        {character.locked && <p className="ok">{character.name} is locked and ready for videos.</p>}
      </div>
    </section>
  )
}

function Queue({ jobs, products, setJobs, runJob, runAll, exportJob, queuedCount }) {
  const name = (id) => products.find((p) => p.id === id)?.title || 'Removed product'
  return (
    <section>
      <h2>Generation queue</h2>
      {jobs.length === 0 && <p className="empty">Nothing queued. Pick a product and tap Queue video.</p>}
      {queuedCount > 0 && <button onClick={runAll}>Run {queuedCount} queued</button>}
      {jobs.map((j) => (
        <div className="card item" key={j.id}>
          {j.still ? <img src={j.still} alt="" /> : <div className="thumb" />}
          <div className="grow">
            <strong>{name(j.productId)}</strong>
            <span>{j.pose}</span>
            <span className={'chip ' + j.status}>{j.status}</span>
            {j.error && <span className="err">{j.error}</span>}
            {j.video?.note && <span className="note">{j.video.note}</span>}
          </div>
          {(j.status === 'queued' || j.status === 'failed') && <button onClick={() => runJob(j)}>Run</button>}
          {j.status === 'done' && <button onClick={() => exportJob(j)}>Export</button>}
          <button className="ghost" onClick={() => setJobs(jobs.filter((x) => x.id !== j.id))}>Remove</button>
        </div>
      ))}
    </section>
  )
}
