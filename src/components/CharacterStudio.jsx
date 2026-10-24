import { uid } from '../utils/uid'

const MAX = 3

export default function CharacterStudio({ characters, setCharacters }) {
  const update = (id, p) => setCharacters((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c)))
  const add = () => setCharacters((cs) => [...cs, { id: uid(), name: '', description: '', seed: Math.floor(Math.random() * 99999), refs: '', locked: false }])

  return (
    <section>
      <h2>Model characters</h2>
      <p className="note">Use fully synthetic characters. Describe the look here, and only add reference images that were AI-generated. Do not upload photos of a real child. Locking freezes the seed and description for every video.</p>
      {characters.length === 0 && <p className="empty">No characters yet. Create the first one.</p>}
      {characters.map((c) => (
        <div className="card" key={c.id}>
          <label>Name<input value={c.name} disabled={c.locked} onChange={(e) => update(c.id, { name: e.target.value })} placeholder="Mina" /></label>
          <label>Look description<textarea rows="4" value={c.description} disabled={c.locked} onChange={(e) => update(c.id, { description: e.target.value })} placeholder="Girl model, shoulder-length black hair with bangs, warm skin tone, round face, brown eyes" /></label>
          <label>Seed<input type="number" value={c.seed} disabled={c.locked} onChange={(e) => update(c.id, { seed: +e.target.value })} /></label>
          <label>Reference image URLs, one per line (4 to 8, synthetic only)<textarea rows="3" value={c.refs} disabled={c.locked} onChange={(e) => update(c.id, { refs: e.target.value })} /></label>
          {c.locked ? (
            <>
              <p className="ok">{c.name} is locked and ready for videos.</p>
              <button className="ghost" onClick={() => update(c.id, { locked: false })}>Unlock to edit</button>
            </>
          ) : (
            <div className="row">
              <button disabled={!c.name.trim() || !c.description.trim()} onClick={() => update(c.id, { locked: true })}>Lock character</button>
              <button className="ghost" onClick={() => setCharacters((cs) => cs.filter((x) => x.id !== c.id))}>Delete</button>
            </div>
          )}
        </div>
      ))}
      {characters.length < MAX ? <button onClick={add}>Add character ({characters.length} of {MAX})</button> : <p className="note">You have reached the limit of {MAX} characters.</p>}
    </section>
  )
}
