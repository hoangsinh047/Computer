export function getPriceBounds(items) {
  const prices = items.map((p) => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return { min, max }
}

export function applyFilters(items, state) {
  const q = (state.query || '').trim().toLowerCase()

  let out = items.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.brand} ${p.category} ${(p.tags || []).join(' ')}`.toLowerCase()
      if (!hay.includes(q)) return false
    }

    if (state.categories?.length && !state.categories.includes(p.category)) return false
    if (state.brands?.length && !state.brands.includes(p.brand)) return false

    if (state.inStockOnly && !p.inStock) return false
    if ((p.rating ?? 0) < (state.minRating ?? 0)) return false

    if (p.price < state.priceMin || p.price > state.priceMax) return false

    return true
  })

  switch (state.sort) {
    case 'price-asc':
      out = out.slice().sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      out = out.slice().sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      out = out.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      break
    case 'featured':
    default:
      break
  }

  return out
}

