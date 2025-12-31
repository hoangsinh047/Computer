import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import { applyFilters, getPriceBounds } from '../lib/filters'
import { categoryLabelFromSlug, NAV_CATEGORIES, NAV_TO_PRODUCT_CATEGORIES, slugifyCategory } from '../lib/categories'
import { Container } from '../components/layout/Container'
import { FilterSidebar } from '../components/catalog/FilterSidebar'
import { MobileFilters } from '../components/catalog/MobileFilters'
import { ProductGrid } from '../components/catalog/ProductGrid'

const DEFAULT_FILTERS = {
  query: '',
  categories: [],
  brands: [],
  inStockOnly: false,
  minRating: 0,
  priceMin: 0,
  priceMax: 0,
  sort: 'featured',
}

function labelFromSlugLoose(slug) {
  // Primary: exact match through helper
  const exact = categoryLabelFromSlug(slug)
  if (exact) return exact

  // Fallback: loose match by comparing slugified labels
  const normalized = String(slug || '').toLowerCase().trim()
  return NAV_CATEGORIES.find((c) => slugifyCategory(c) === normalized) || null
}

export function CategoryPage({ onAddToCart, onOpenCart }) {
  const params = useParams()
  const label = useMemo(() => labelFromSlugLoose(params.slug), [params.slug])

  const mappedProductCategories = useMemo(
    () => (label ? NAV_TO_PRODUCT_CATEGORIES[label] || [] : []),
    [label],
  )

  // Items for this nav category
  const baseItems = useMemo(() => {
    if (!label) return []
    if (!mappedProductCategories.length) return []
    return products.filter((p) => mappedProductCategories.includes(p.category))
  }, [label, mappedProductCategories])

  const priceBounds = useMemo(() => {
    if (!baseItems.length) return { min: 0, max: 0 }
    return getPriceBounds(baseItems)
  }, [baseItems])

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  // Always sync initial filter ranges + default categories when switching between slugs
  useEffect(() => {
    setFilters((prev) => {
      const next = {
        ...prev,
        categories: mappedProductCategories.slice(),
        priceMin: priceBounds.min,
        priceMax: priceBounds.max,
      }
      return next
    })
  }, [params.slug, mappedProductCategories, priceBounds.min, priceBounds.max])

  const effectiveFilters = useMemo(() => {
    return {
      ...filters,
      categories: filters.categories?.length ? filters.categories : mappedProductCategories,
      priceMin: Number.isFinite(filters.priceMin) ? filters.priceMin : priceBounds.min,
      priceMax: Number.isFinite(filters.priceMax) ? filters.priceMax : priceBounds.max,
    }
  }, [filters, mappedProductCategories, priceBounds])

  const filtered = useMemo(() => applyFilters(baseItems, effectiveFilters), [baseItems, effectiveFilters])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const patchFilters = (patch) => setFilters((s) => ({ ...s, ...patch }))

  return (
    <main>
      <Container>
        <div className="py-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold text-white/55">Danh mục</div>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white/92">
                {label || 'Không tìm thấy danh mục'}
              </h1>
              <p className="mt-2 text-sm text-white/60">Lọc theo hãng, giá, tình trạng kho, đánh giá</p>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <div className="text-sm text-white/60">
                <span className="font-semibold text-white/85">{filtered.length}</span> sản phẩm
              </div>
              <button
                className="ring-focus rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/8"
                onClick={() => setMobileFiltersOpen(true)}
                disabled={!label}
              >
                Filters
              </button>
            </div>
          </div>

          {!label ? (
            <div className="card mt-8 p-6">
              <div className="text-sm font-semibold text-white/85">Danh mục không tồn tại.</div>
              <div className="mt-2 text-sm text-white/55">Hãy chọn từ menu phía trên.</div>
            </div>
          ) : mappedProductCategories.length === 0 ? (
            <div className="card mt-8 p-6">
              <div className="text-sm font-semibold text-white/85">Chưa có mock data cho mục “{label}”.</div>
              <div className="mt-2 text-sm text-white/55">
                Bạn có thể map mục này tới category trong <code className="text-white/70">src/lib/categories.js</code>{' '}
                hoặc thêm sản phẩm vào <code className="text-white/70">src/data/products.js</code>.
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
              <FilterSidebar items={baseItems} state={effectiveFilters} onChange={patchFilters} priceBounds={priceBounds} />

              <div>
                <div className="mb-4 hidden items-end justify-between lg:flex">
                  <div className="text-sm text-white/60">
                    Showing <span className="font-semibold text-white/85">{filtered.length}</span>/{baseItems.length}
                  </div>
                </div>

                <ProductGrid
                  items={filtered}
                  state={effectiveFilters}
                  onToggleCategory={(c) => {
                    patchFilters({
                      categories: effectiveFilters.categories.includes(c)
                        ? effectiveFilters.categories.filter((x) => x !== c)
                        : [...effectiveFilters.categories, c],
                    })
                  }}
                  onAddToCart={onAddToCart}
                  onOpenCart={onOpenCart}
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        items={baseItems}
        state={effectiveFilters}
        onChange={patchFilters}
        priceBounds={priceBounds}
      />
    </main>
  )
}
