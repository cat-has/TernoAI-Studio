import { useState } from 'react'
import { POSES } from '../ai'
import { uid } from '../utils/uid'

export default function ProductLibrary({ products, characters, customPoses, addPose, removeProduct, onQueue, goCharacters }) {
  const locked = characters.filter((c) => c.locked)
  const poses = [...POSES, ...customPoses]
  const [pose, setPose] = useState(POSES[0])
  const [count, setCount] = useState(1)
  const [charId, setCharId] = useState('')
  const [newPose, setNewPose] = useState('')
  const activeChar = charId || locked[0]?.id || ''

  function queue(p) {
    if (!activeChar) return goCharacters()
    onQueue(Array.from({ length: count }, () => ({
      id: uid(), productId: p.id, characterId: activeChar, pose,
      status: 'queued', stillKey: '', videoUrl: '', videoNote: '', error: '', createdAt: Date.now()
    })))
  }

  return (
    <section>
      <h2>Your products</h2>
      {products.length === 0 && <p className="empty">No products yet. Add one above to start a video.</p>}
      {products.length > 0 && (
        <div className="card">
          <div className="row">
            <label>Character<select value={activeChar} onChange={(e) => setCharId(e.target.value)}>
              {locked.length === 0 && <option value="">No locked character</option>}
              {locked.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></label>
            <label>Variations<select value={count} onChange={(e) => setCount(+e.target.value)}>{[1, 2, 3, 5, 10].map((n) => <option key={n}>{n}</option>)}</select></label>
          </div>
          <label>Pose<select value={pose} onChange={(e) => setPose(e.target.value)}>{poses.map((p) => <option key={p}>{p}</option>)}</select></label>
          <div className="row">
            <input value={newPose} onChange={(e) => setNewPose(e.target.value)} placeholder="Custom pose" aria-label="Custom pose" />
            <button className="ghost" disabled={!newPose.trim()} onClick={() => { addPose(newPose.trim()); setPose(newPose.trim()); setNewPose('') }}>Add pose</button>
          </div>
        </div>
      )}
      {products.map((p) => (
        <div className="card item" key={p.id}>
          {p.image ? <img src={p.image} alt="" /> : <div className="thumb" />}
          <div className="grow"><strong>{p.title}</strong><span>{p.price}</span></div>
          <button onClick={() => queue(p)}>Queue video</button>
          <button className="ghost" onClick={() => removeProduct(p.id)}>Remove</button>
        </div>
      ))}
    </section>
  )
}
