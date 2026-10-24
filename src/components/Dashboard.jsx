export default function Dashboard({ jobs, products, characters, go }) {
  const today = new Date().toDateString()
  const doneToday = jobs.filter(
    (j) => j.status === 'done' && new Date(j.createdAt || 0).toDateString() === today
  ).length
  const name = (id) => products.find((p) => p.id === id)?.title || 'Removed product'
  const locked = characters.filter((c) => c.locked)

  return (
    <section>
      {/* Hero stat card */}
      <div className="card stat">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <strong>{doneToday}</strong>
            <span style={{ display: 'block', marginTop: 4, opacity: 0.75 }}>
              videos finished today
            </span>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            ✨
          </div>
        </div>
        <button onClick={() => go('products')} style={{ marginTop: 8 }}>
          + New video
        </button>
      </div>

      {/* Locked characters */}
      <h2>Locked characters</h2>
      {locked.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 32, marginBottom: 8 }}>👧</div>
          <p style={{ margin: '0 0 12px' }}>
            No locked characters yet.
          </p>
          <button className="link" onClick={() => go('characters')}>
            Create your first model →
          </button>
        </div>
      ) : (
        <div className="chips" style={{ marginBottom: 8 }}>
          {locked.map((c) => (
            <span className="chip done" key={c.id}>
              {c.name}
            </span>
          ))}
        </div>
      )}

      {/* Recent jobs */}
      <h2>Recent jobs</h2>
      {jobs.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎬</div>
          <p style={{ margin: 0 }}>
            No jobs yet. Tap <strong>New video</strong> to start creating.
          </p>
        </div>
      ) : (
        jobs.slice(0, 4).map((j) => (
          <div className="card item" key={j.id}>
            <div
              className="thumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                background: 'linear-gradient(160deg, #FBE3EA, #F7C6D4)',
              }}
            >
              {j.status === 'done' ? '✅' : j.status === 'generating' ? '⏳' : '◎'}
            </div>
            <div className="grow">
              <strong>{name(j.productId)}</strong>
              <span>{j.pose}</span>
            </div>
            <span className={'chip ' + j.status}>{j.status}</span>
          </div>
        ))
      )}
    </section>
  )
}