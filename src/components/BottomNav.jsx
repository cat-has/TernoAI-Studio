const TABS = [['home', 'Home'], ['products', 'Products'], ['characters', 'Characters'], ['queue', 'Queue']]

export default function BottomNav({ tab, setTab, queueCount }) {
  return (
    <nav aria-label="Main">
      {TABS.map(([k, label]) => (
        <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
          {label}{k === 'queue' && queueCount ? ` (${queueCount})` : ''}
        </button>
      ))}
    </nav>
  )
}
