import { FilterSidebar } from './FilterSidebar'

export function MobileFilters({ open, onClose, items, state, onChange, priceBounds }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-auto rounded-t-3xl border border-white/10 bg-[rgb(var(--bg))] p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white/90">Filters</div>
          <button
            className="ring-focus rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold"
            onClick={onClose}
          >
            Done
          </button>
        </div>

        <div className="mt-4 card p-4">
          <FilterSidebar
            variant="mobile"
            items={items}
            state={state}
            onChange={onChange}
            priceBounds={priceBounds}
          />
        </div>
      </div>
    </div>
  )
}

