import { useState } from 'react'
import { generateStill, generateVideo, makeCaption } from './ai'
import { usePersisted } from './hooks/usePersisted'
import { saveMedia, loadMedia, deleteMedia } from './hooks/useIndexedDB'
import { download } from './utils/download'
import Dashboard from './components/Dashboard'
import ProductImporter from './components/ProductImporter'
import ProductLibrary from './components/ProductLibrary'
import CharacterStudio from './components/CharacterStudio'
import Queue from './components/Queue'
import BottomNav from './components/BottomNav'
import './styles.css'

export default function App() {
  const [tab, setTab] = useState('home')
  const [products, setProducts] = usePersisted('terno.products', [])
  const [characters, setCharacters] = usePersisted('terno.characters', [])
  const [jobs, setJobs] = usePersisted('terno.jobs', [])
  const [customPoses, setCustomPoses] = usePersisted('terno.poses', [])

  const patch = (id, p) => setJobs((js) => js.map((j) => (j.id === id ? { ...j, ...p } : j)))
  const isPending = (j) => j.status === 'queued' || j.status === 'failed'

  async function runJob(job) {
    const product = products.find((p) => p.id === job.productId)
    const character = characters.find((c) => c.id === job.characterId)
    if (!product || !character) return patch(job.id, { status: 'failed', error: 'Product or character was removed.' })
    patch(job.id, { status: 'generating', error: '' })
    try {
      const still = await generateStill({ character, product, pose: job.pose })
      await saveMedia(job.id + ':still', still)
      patch(job.id, { stillKey: job.id + ':still' })
      const video = await generateVideo({ still, pose: job.pose })
      patch(job.id, { status: 'done', videoUrl: video.url || '', videoNote: video.note || '' })
    } catch (e) {
      patch(job.id, { status: 'failed', error: String(e.message || e) })
    }
  }

  async function runAll() {
    for (const j of jobs.filter(isPending)) await runJob(j)
  }

  async function exportJob(job) {
    const product = products.find((p) => p.id === job.productId) || {}
    const base = (product.title || 'video').replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-' + job.id
    const still = job.stillKey ? await loadMedia(job.stillKey) : null
    if (still) download(base + '-still.svg', still)
    download(base + '-caption.txt', 'data:text/plain;charset=utf-8,' + encodeURIComponent(makeCaption(product)))
    if (job.videoUrl) download(base + '.mp4', job.videoUrl)
  }

  function removeJob(job) {
    if (job.stillKey) deleteMedia(job.stillKey).catch(() => {})
    setJobs((js) => js.filter((x) => x.id !== job.id))
  }

  function addJobs(list) {
    setJobs((js) => [...list, ...js])
    setTab('queue')
  }

  const lockedCount = characters.filter((c) => c.locked).length

  return (
    <div className="app">
      <header>
        <h1>TernoAI Studio</h1>
        <p>{products.length} products, {lockedCount} locked characters, {jobs.filter((j) => j.status === 'done').length} videos ready</p>
      </header>
      <main>
        {tab === 'home' && <Dashboard jobs={jobs} products={products} characters={characters} go={setTab} />}
        {tab === 'products' && (
          <>
            <ProductImporter onSave={(p) => setProducts((ps) => [p, ...ps])} />
            <ProductLibrary
              products={products} characters={characters} customPoses={customPoses}
              addPose={(p) => setCustomPoses((ps) => (ps.includes(p) ? ps : [...ps, p]))}
              removeProduct={(id) => setProducts((ps) => ps.filter((p) => p.id !== id))}
              onQueue={addJobs} goCharacters={() => setTab('characters')}
            />
          </>
        )}
        {tab === 'characters' && <CharacterStudio characters={characters} setCharacters={setCharacters} />}
        {tab === 'queue' && (
          <Queue jobs={jobs} products={products} runJob={runJob} runAll={runAll} exportJob={exportJob} removeJob={removeJob} pending={jobs.filter(isPending).length} />
        )}
      </main>
      <BottomNav tab={tab} setTab={setTab} queueCount={jobs.length} />
    </div>
  )
}
