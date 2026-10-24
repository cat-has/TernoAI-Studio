import { useState, useEffect } from 'react'

const open = () =>
  new Promise((res, rej) => {
    const r = indexedDB.open('terno', 1)
    r.onupgradeneeded = () => r.result.createObjectStore('media')
    r.onsuccess = () => res(r.result)
    r.onerror = () => rej(r.error)
  })

async function tx(mode, fn) {
  const db = await open()
  return new Promise((res, rej) => {
    const t = db.transaction('media', mode)
    const req = fn(t.objectStore('media'))
    t.oncomplete = () => res(req.result)
    t.onerror = () => rej(t.error)
  })
}

export const saveMedia = (k, v) => tx('readwrite', (s) => s.put(v, k))
export const loadMedia = (k) => tx('readonly', (s) => s.get(k))
export const deleteMedia = (k) => tx('readwrite', (s) => s.delete(k))

export function useMedia(key) {
  const [v, setV] = useState(null)
  useEffect(() => {
    let on = true
    if (!key) { setV(null); return }
    loadMedia(key).then((x) => on && setV(x || null)).catch(() => {})
    return () => { on = false }
  }, [key])
  return v
}
