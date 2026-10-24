import JobCard from './JobCard'

export default function Queue({ jobs, products, runJob, runAll, exportJob, removeJob, pending }) {
  const name = (id) => products.find((p) => p.id === id)?.title || 'Removed product'
  return (
    <section>
      <h2>Generation queue</h2>
      {jobs.length === 0 && <p className="empty">Nothing queued. Pick a product and tap Queue video.</p>}
      {pending > 0 && <button onClick={runAll}>Run all {pending}</button>}
      {jobs.map((j) => <JobCard key={j.id} job={j} name={name(j.productId)} runJob={runJob} exportJob={exportJob} removeJob={removeJob} />)}
    </section>
  )
}
