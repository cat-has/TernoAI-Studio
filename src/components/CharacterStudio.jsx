import { uid } from '../utils/uid'

const MAX = 3

export default function CharacterStudio({ characters, setCharacters }) {
  const update = (id, p) =>
    setCharacters((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c)))

  const add = () =>
    setCharacters((cs) => [
      ...cs,
      {
        id: uid(),
        name: '',
        description: '',
        seed: Math.floor(Math.random() * 99999),
        refs: '',
        locked: false,
      },
    ])

  return (
    <section>
      <h2>Model characters</h2>

      <p className="note" style={{ marginBottom: 18 }}>
        Create fully synthetic characters only. Describe the look in detail and
        only use AI-generated reference images. Never upload photos of a real child.
        Locking freezes the name, description and seed so every video stays consistent.
      </p>

      {characters.length === 0 && (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>👧</div>
          <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '1.05rem' }}>
            No characters yet
          </p>
          <p style={{ margin: 0, opacity: 0.75, lineHeight: 1.45 }}>
            Create your first consistent AI model to start generating try-on videos.
          </p>
        </div>
      )}

      {characters.map((c, index) => (
        <div className="card" key={c.id} style={{ position: 'relative' }}>
          {/* Card header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <strong style={{ fontSize: '1.05rem' }}>
              {c.name.trim() || `Character ${index + 1}`}
            </strong>

            {c.locked ? (
              <span className="chip done" style={{ margin: 0 }}>
                Locked
              </span>
            ) : (
              <span
                className="chip"
                style={{ margin: 0, background: '#F5E6EB', color: '#8A5A6B' }}
              >
                Draft
              </span>
            )}
          </div>

          <label>
            Name
            <input
              value={c.name}
              disabled={c.locked}
              onChange={(e) => update(c.id, { name: e.target.value })}
              placeholder="Mina"
            />
          </label>

          <label>
            Look description
            <textarea
              rows={4}
              value={c.description}
              disabled={c.locked}
              onChange={(e) => update(c.id, { description: e.target.value })}
              placeholder="Girl model, shoulder-length black hair with bangs, warm skin tone, round face, brown eyes, slim build"
            />
          </label>

          <label>
            Seed
            <input
              type="number"
              value={c.seed}
              disabled={c.locked}
              onChange={(e) => update(c.id, { seed: +e.target.value })}
            />
          </label>

          <label>
            Reference image URLs
            <span
              style={{
                display: 'block',
                fontWeight: 400,
                fontSize: '0.8rem',
                opacity: 0.65,
                margin: '2px 0 6px',
              }}
            >
              One URL per line · 4–8 recommended · synthetic images only
            </span>
            <textarea
              rows={3}
              value={c.refs}
              disabled={c.locked}
              onChange={(e) => update(c.id, { refs: e.target.value })}
              placeholder="https://..."
            />
          </label>

          {c.locked ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              <p className="ok" style={{ margin: 0 }}>
                ✓ {c.name} is locked and ready for videos
              </p>
              <button
                className="ghost"
                onClick={() => update(c.id, { locked: false })}
              >
                Unlock to edit
              </button>
            </div>
          ) : (
            <div className="row" style={{ marginTop: 4 }}>
              <button
                disabled={!c.name.trim() || !c.description.trim()}
                onClick={() => update(c.id, { locked: true })}
              >
                Lock character
              </button>
              <button
                className="ghost"
                onClick={() =>
                  setCharacters((cs) => cs.filter((x) => x.id !== c.id))
                }
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {characters.length < MAX ? (
        <button onClick={add} style={{ width: '100%', marginTop: 6 }}>
          + Add character ({characters.length} of {MAX})
        </button>
      ) : (
        <p className="note" style={{ textAlign: 'center', marginTop: 12 }}>
          You’ve reached the limit of {MAX} characters.
        </p>
      )}
    </section>
  )
}