import { useMedia } from '../hooks/useIndexedDB'

export default function JobCard({ job, name, runJob, exportJob, removeJob }) {
  const still = useMedia(job.stillKey)

  const statusIcon = {
    queued: '◎',
    generating: '⏳',
    done: '✅',
    failed: '⚠️',
  }[job.status] || '◎'

  return (
    <div className="card item">
      {/* Thumbnail */}
      {still ? (
        <img src={still} alt={name} />
      ) : (
        <div
          className="thumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            background: 'linear-gradient(160deg, #FBE3EA, #F7C6D4)',
            color: '#C42F63',
          }}
        >
          {statusIcon}
        </div>
      )}

      {/* Info */}
      <div className="grow">
        <strong style={{ fontSize: '0.95rem' }}>{name}</strong>
        <span>{job.pose}</span>

        <span className={'chip ' + job.status} style={{ marginTop: 4 }}>
          {job.status}
        </span>

        {job.error && (
          <span className="err" style={{ marginTop: 4, display: 'block' }}>
            {job.error}
          </span>
        )}

        {job.videoNote && (
          <span className="note" style={{ marginTop: 4, display: 'block' }}>
            {job.videoNote}
          </span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(job.status === 'queued' || job.status === 'failed') && (
          <button onClick={() => runJob(job)}>Run</button>
        )}

        {job.status === 'done' && (
          <button onClick={() => exportJob(job)}>Export</button>
        )}

        <button className="ghost" onClick={() => removeJob(job)}>
          ✕
        </button>
      </div>
    </div>
  )
}