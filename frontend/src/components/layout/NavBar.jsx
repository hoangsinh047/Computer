import { NavLink } from 'react-router-dom'
import { Container } from './Container'
import { NAV_CATEGORIES, slugifyCategory } from '../../lib/categories'

export function NavBar() {
  return (
    <div className="border-b border-white/10 bg-[rgb(var(--bg))]/60 backdrop-blur">
      <Container>
        <nav className="no-scrollbar flex gap-2 overflow-auto py-3">
          {NAV_CATEGORIES.map((label) => {
            const to = `/c/${slugifyCategory(label)}`
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `ring-focus whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'border-white/20 bg-white/10 text-white/90'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/8'
                  }`
                }
              >
                {label}
              </NavLink>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}

