// Tiny click and event tracker.
// Today it logs to the console and localStorage.
// In Project 3, set VITE_TRACK_URL to your Express API (e.g. http://localhost:4000/api/events).
const URL = import.meta.env.VITE_TRACK_URL

export function track(event, data = {}) {
  const payload = { event, ...data, variant: safeGet('flare_ab'), ts: new Date().toISOString() }
  console.info('[track]', payload)
  try {
    const log = JSON.parse(localStorage.getItem('flare_events') || '[]')
    log.push(payload)
    localStorage.setItem('flare_events', JSON.stringify(log.slice(-200)))
  } catch { /* storage blocked, ignore */ }
  if (URL) {
    const body = JSON.stringify(payload)
    navigator.sendBeacon?.(URL, new Blob([body], { type: 'application/json' })) ||
      fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  }
}

export function safeGet(key) { try { return localStorage.getItem(key) } catch { return null } }
export function safeSet(key, v) { try { localStorage.setItem(key, v) } catch { /* ignore */ } }
