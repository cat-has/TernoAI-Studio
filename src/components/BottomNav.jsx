const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'products', label: 'Products', icon: '👗' },
  { id: 'characters', label: 'Characters', icon: '👧' },
  { id: 'queue', label: 'Queue', icon: '🎬' },
]

export default function BottomNav({ tab, setTab, queueCount }) {
  return (
    <nav aria-label="Main">
      {TABS.map(({ id, label, icon }) => {
        const isActive = tab === id
        const showBadge = id === 'queue' && queueCount > 0

        return (
          <button
            key={id}
            className={isActive ? 'on' : ''}
            onClick={() => setTab(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              position: 'relative',
              fontSize: '0.78rem',
              lineHeight: 1.2,
            }}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{icon}</span>
            <span>
              {label}
              {showBadge ? ` (${queueCount})` : ''}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 6,
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--blush)',
                }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}