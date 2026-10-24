import { useState } from 'react'
import { importProduct } from '../ai'
import { uid } from '../utils/uid'

const empty = { link: '', title: '', price: '', image: '' }

export default function ProductImporter({ onSave }) {
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function fetchDetails() {
    if (!form.link.trim()) return
    setBusy(true)
    try {
      const d = await importProduct(form.link)
      setForm((f) => ({
        ...f,
        title: d.title || f.title,
        price: d.price || f.price,
        image: d.image || f.image,
      }))
    } finally {
      setBusy(false)
    }
  }

  function handleSave() {
    if (!form.title.trim()) return
    onSave({ id: uid(), ...form })
    setForm(empty)
  }

  return (
    <section>
      <h2>Add a product</h2>

      <div className="card">
        <label>
          TikTok Shop link
          <input
            value={form.link}
            onChange={set('link')}
            placeholder="https://shop.tiktok.com/..."
            inputMode="url"
          />
        </label>

        <button
          className="ghost"
          onClick={fetchDetails}
          disabled={busy || !form.link.trim()}
        >
          {busy ? 'Fetching details...' : 'Fetch details'}
        </button>

        <div
          style={{
            height: 1,
            background: 'var(--line-soft)',
            margin: '4px 0',
          }}
        />

        <label>
          Name
          <input
            value={form.title}
            onChange={set('title')}
            placeholder="Pink Floral Terno Set"
          />
        </label>

        <label>
          Price
          <input
            value={form.price}
            onChange={set('price')}
            placeholder="PHP 399"
          />
        </label>

        <label>
          Product photo URL
          <input
            value={form.image}
            onChange={set('image')}
            placeholder="https://..."
            inputMode="url"
          />
        </label>

        <button
          disabled={!form.title.trim()}
          onClick={handleSave}
          style={{ marginTop: 4 }}
        >
          Save product
        </button>
      </div>
    </section>
  )
}