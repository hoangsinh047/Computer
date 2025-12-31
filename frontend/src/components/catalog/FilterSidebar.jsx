import { useMemo } from 'react'
import { formatVND } from '../../lib/format'

export function FilterSidebar({ items, state, onChange, priceBounds, variant = 'desktop' }) {
  const categories = useMemo(() => {
    const s = new Set()
    for (const p of items) s.add(p.category)
    return Array.from(s)
  }, [items])

  const brands = useMemo(() => {
    const s = new Set()
    for (const p of items) s.add(p.brand)
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [items])

  const toggleInArray = (arr, value) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]

  const onPriceMin = (v) => {
    onChange({ priceMin: Math.min(v, state.priceMax) })
  }

  const onPriceMax = (v) => {
    onChange({ priceMax: Math.max(v, state.priceMin) })
  }

  const Wrapper = variant === 'desktop' ? 'aside' : 'div'
  const wrapperClassName =
    variant === 'desktop'
      ? 'card sticky top-20 hidden h-fit p-5 lg:block'
      : 'space-y-6'

  return (
    <Wrapper className={wrapperClassName}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white/90">Filters</div>
        <button
          className="ring-focus rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/65 hover:bg-white/8"
          onClick={() =>
            onChange({
              categories: [],
              brands: [],
              inStockOnly: false,
              minRating: 0,
              priceMin: priceBounds.min,
              priceMax: priceBounds.max,
              sort: 'featured',
            })
          }
        >
          Reset
        </button>
      </div>

      <div className="mt-5 space-y-6">
        <section>
          <div className="text-xs font-semibold text-white/65">Danh mục</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = state.categories.includes(c)
              return (
                <button
                  key={c}
                  className={`ring-focus rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    active
                      ? 'border-white/20 bg-white/10 text-white/85'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/8'
                  }`}
                  onClick={() => onChange({ categories: toggleInArray(state.categories, c) })}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <div className="text-xs font-semibold text-white/65">Hãng</div>
          <div className="mt-3 space-y-2">
            {brands.map((b) => {
              const checked = state.brands.includes(b)
              return (
                <label
                  key={b}
                  className="flex cursor-pointer items-center gap-2 text-sm text-white/70"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange({ brands: toggleInArray(state.brands, b) })}
                    className="rounded border-white/15 bg-white/5"
                  />
                  <span>{b}</span>
                </label>
              )
            })}
          </div>
        </section>

        <section>
          <div className="text-xs font-semibold text-white/65">Giá</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <div className="text-[11px] text-white/45">Min</div>
              <input
                type="number"
                value={state.priceMin}
                min={priceBounds.min}
                max={state.priceMax}
                onChange={(e) => onPriceMin(Number(e.target.value))}
                className="ring-focus mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
              />
            </div>
            <div>
              <div className="text-[11px] text-white/45">Max</div>
              <input
                type="number"
                value={state.priceMax}
                min={state.priceMin}
                max={priceBounds.max}
                onChange={(e) => onPriceMax(Number(e.target.value))}
                className="ring-focus mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
              />
            </div>
          </div>
          <div className="mt-2 text-xs text-white/45">
            {formatVND(state.priceMin)} – {formatVND(state.priceMax)}
          </div>
        </section>

        <section>
          <div className="text-xs font-semibold text-white/65">Rating</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[0, 4, 4.5].map((r) => {
              const active = state.minRating === r
              return (
                <button
                  key={r}
                  className={`ring-focus rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? 'border-white/20 bg-white/10 text-white/85'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/8'
                  }`}
                  onClick={() => onChange({ minRating: r })}
                >
                  {r === 0 ? 'Any' : `≥ ${r}`}
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <label className="flex items-center justify-between gap-3 text-sm text-white/70">
            <span>In stock only</span>
            <input
              type="checkbox"
              checked={state.inStockOnly}
              onChange={(e) => onChange({ inStockOnly: e.target.checked })}
              className="rounded border-white/15 bg-white/5"
            />
          </label>
        </section>

        <section>
          <div className="text-xs font-semibold text-white/65">Sort</div>
          <select
            value={state.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="ring-focus mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating</option>
          </select>
        </section>
      </div>
    </Wrapper>
  )
}

