import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Container } from './Container'

export function Header({
  query,
  onQueryChange,
  categories,
  activeCategories,
  onToggleCategory,
  cartCount,
  onCartClick,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeSet = useMemo(() => new Set(activeCategories), [activeCategories])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgb(var(--bg))]/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              className="ring-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Link to="/" className="group inline-flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 shadow-[0_10px_40px_rgba(99,102,241,0.15)]">
                <span className="h-3 w-3 rounded-full bg-gradient-to-br from-cyan-300 to-indigo-400" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  NOVA RIG
                </div>
                <div className="text-[11px] text-white/55">Premium PC Parts</div>
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 px-5 md:block">
            <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/40 focus:outline-none"
                placeholder="Search CPU, GPU, RAM, SSD, gaming gear…"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                aria-label="Search products"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="ring-focus hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85 md:inline-flex">
              Account
            </button>

            <button
              className="ring-focus relative inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3"
              onClick={onCartClick}
              aria-label="Open cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.5 10h14l-1.2 10H7.7L6.5 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 10V8a3 3 0 016 0v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-indigo-500 px-1 text-[11px] font-bold text-black">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/40 focus:outline-none"
              placeholder="Search products…"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              aria-label="Search products"
            />
          </div>

          {mobileOpen ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {categories.map((c) => {
                const active = activeSet.has(c)
                return (
                  <button
                    key={c}
                    className={`ring-focus rounded-2xl border px-3 py-2 text-left text-sm font-semibold transition ${
                      active
                        ? 'border-white/20 bg-white/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/7'
                    }`}
                    onClick={() => onToggleCategory(c)}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  )
}
