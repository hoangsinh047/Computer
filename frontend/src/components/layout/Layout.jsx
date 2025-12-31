import { Outlet, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { products } from '../../data/products'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { useCart } from '../../cart/CartContext'
import { slugifyCategory, NAV_CATEGORIES, NAV_TO_PRODUCT_CATEGORIES } from '../../lib/categories'
import { CartDrawer } from '../../cart/CartDrawer'

export function Layout() {
  const cart = useCart()
  const navigate = useNavigate()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')

  // For mobile quick category buttons in header: only show categories that actually exist in products
  const categoriesInData = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    // show labels whose mapping intersects with data categories
    const out = []
    for (const label of NAV_CATEGORIES) {
      const mapped = NAV_TO_PRODUCT_CATEGORIES[label] || []
      if (mapped.some((c) => set.has(c))) out.push(label)
    }
    return out
  }, [])

  return (
    <div className="min-h-dvh">
      <Header
        query={query}
        onQueryChange={(v) => setQuery(v)}
        categories={categoriesInData}
        activeCategories={[]}
        onToggleCategory={(label) => navigate(`/c/${slugifyCategory(label)}`)}
        cartCount={cart.count}
        onCartClick={() => setDrawerOpen(true)}
      />

      <NavBar />

      <Outlet context={{ query, onOpenCart: () => setDrawerOpen(true) }} />

      <Footer />

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}

