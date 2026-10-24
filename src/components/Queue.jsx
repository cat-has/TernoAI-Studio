import JobCard from './JobCard'

export default function Queue({
  jobs,
  products,
  runJob,
  runAll,
  exportJob,
  removeJob,
  pending,
}) {
  const name = (id) =>
    products.find((p) => p.id === id)?.title || 'Removed product'

  return (
    <section>
      <h2>Generation queue</h2>

      {jobs.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 36, marginBottom: 10 }}>🎬</div>
          <p style={{ margin: '0 0 6px', fontWeight: 600 }}>
            Nothing in the queue
          </p>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Go to Products, choose a pose, and tap <strong>Queue</strong> to start.
          </p>
        </div>
      ) : (
        <>
          {pending > 0 && (
            <button
              onClick={runAll}
              style={{ width: '100%', marginBottom: 14 }}
            >
              ▶ Run all {pending} queued
            </button>
          )}

          {jobs.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              name={name(j.productId)}
              runJob={runJob}
              exportJob={exportJob}
              removeJob={removeJob}
            />
          ))}
        </>
      )}
    </section>
  )
}