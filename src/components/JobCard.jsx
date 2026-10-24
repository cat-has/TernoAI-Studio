import { useMedia } from '../hooks/useIndexedDB'

export default function JobCard({ job, name, runJob, exportJob, removeJob }) {
  const still = useMedia(job.stillKey)
  return (
    <div className="card item">
      {still ? <img src={still} alt="" /> : <div className="thumb" />}
      <div className="grow">
        <strong>{name}</strong>
        <span>{job.pose}</span>
        <span className={'chip ' + job.status}>{job.status}</span>
        {job.error && <span className="err">{job.error}</span>}
        {job.videoNote && <span className="note">{job.videoNote}</span>}
      </div>
      {(job.status === 'queued' || job.status === 'failed') && <button onClick={() => runJob(job)}>Run</button>}
      {job.status === 'done' && <button onClick={() => exportJob(job)}>Export</button>}
      <button className="ghost" onClick={() => removeJob(job)}>Remove</button>
    </div>
  )
}
