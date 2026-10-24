export default function Dashboard({ jobs, products, characters, go }) {
  const today = new Date().toDateString()
  const doneToday = jobs.filter((j) => j.status === 'done' && new Date(j.createdAt || 0).toDateString() === today).length
  const name = (id) => products.find((p) => p.id === id)?.title || 'Removed product'
  const locked = characters.filter((c) => c.locked)
  return (
    <section>
      <div className="card stat">
        <strong>{doneToday}</strong>
        <span>videos finished today</span>
        <button onClick={() => go('products')}>New video</button>
      </div>
      <h2>Locked characters</h2>
      {locked.length === 0 ? (
        <p className="empty">No locked characters. <button className="link" onClick={() => go('characters')}>Create one</button> before queueing videos.</p>
      ) : (
        <div className="chips">{locked.map((c) => <span className="chip done" key={c.id}>{c.name}</span>)}</div>
      )}
      <h2>Recent jobs</h2>
      {jobs.length === 0 && <p className="empty">No jobs yet. Tap New video to start.</p>}
      {jobs.slice(0, 4).map((j) => (
        <div className="card item" key={j.id}>
          <div className="grow"><strong>{name(j.productId)}</strong><span>{j.pose}</span></div>
          <span className={'chip ' + j.status}>{j.status}</span>
        </div>
      ))}
    </section>
  )
}
