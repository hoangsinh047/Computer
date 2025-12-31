const KEY = 'nova_rig_cart_v1'

export function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed
  } catch {
    return {}
  }
}

export function writeCartToStorage(itemsById) {
  try {
    localStorage.setItem(KEY, JSON.stringify(itemsById))
  } catch {
    // ignore
  }
}
