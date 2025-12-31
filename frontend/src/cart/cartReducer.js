export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, qty = 1 } = action
      return { ...state, [id]: (state[id] ?? 0) + qty }
    }
    case 'SET_QTY': {
      const { id, qty } = action
      const q = Number(qty)
      if (!Number.isFinite(q) || q <= 0) {
        const { [id]: _, ...rest } = state
        return rest
      }
      return { ...state, [id]: Math.floor(q) }
    }
    case 'REMOVE': {
      const { id } = action
      const { [id]: _, ...rest } = state
      return rest
    }
    case 'CLEAR':
      return {}
    case 'HYDRATE':
      return action.payload || {}
    default:
      return state
  }
}

export function cartCount(itemsById) {
  return Object.values(itemsById).reduce((acc, n) => acc + (n || 0), 0)
}

