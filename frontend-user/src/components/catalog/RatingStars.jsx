export function RatingStars({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className="inline-flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} filled />
      ))}
      {half ? <Star half /> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} />
      ))}
    </div>
  )
}

function Star({ filled, half }) {
  if (half) {
    return (
      <span className="relative inline-block h-4 w-4">
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-4 w-4 text-white/25"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.3l-6.18 3.25 1.18-6.88L1.99 8.8l6.9-1L12 1.6l3.11 6.2 6.9 1-5 4.87 1.18 6.88L12 17.3z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-4 w-4 text-cyan-300"
          fill="currentColor"
          aria-hidden="true"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        >
          <path d="M12 17.3l-6.18 3.25 1.18-6.88L1.99 8.8l6.9-1L12 1.6l3.11 6.2 6.9 1-5 4.87 1.18 6.88L12 17.3z" />
        </svg>
      </span>
    )
  }

  const cls = filled ? 'text-cyan-300' : 'text-white/25'
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${cls}`} fill="currentColor" aria-hidden="true">
      <path d="M12 17.3l-6.18 3.25 1.18-6.88L1.99 8.8l6.9-1L12 1.6l3.11 6.2 6.9 1-5 4.87 1.18 6.88L12 17.3z" />
    </svg>
  )
}

