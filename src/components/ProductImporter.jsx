import { useState } from 'react'
import { importProduct } from '../ai'
import { uid } from '../utils/uid'

const empty = { link: '', title: '', price: '', image: '' }

export default function ProductImporter({ onSave }) {
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function fetchDetails() {
    setBusy(true)
    const d = await importProduct(form.link)
    setForm((f) => ({ ...f, title: d.title || f.title, price: d.price || f.price, image: d.image || f.image }))
    setBusy(false)
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
        <button disabled={!form.title.trim()} onClick={() => { onSave({ id: uid(), ...form }); setForm(empty) }}>Save product</button>
      </div>
    </section>
  )
}
