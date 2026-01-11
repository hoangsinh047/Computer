import { ProductCard } from './ProductCard'

const featuredCategories = ['CPU', 'GPU', 'RAM', 'SSD', 'Gaming Gear']

export function ProductGrid({ items, state, onToggleCategory, onAddToCart, onOpenCart }) {
  return (
    <section id="catalog" className="py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white/92">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Bộ sưu tập linh kiện và phụ kiện được tuyển chọn.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {featuredCategories.map((c) => {
              const active = state.categories.includes(c)
              return (
                <button
                  key={c}
                  className={`ring-focus rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    active
                      ? 'border-white/20 bg-white/10 text-white/85'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/8'
                  }`}
                  onClick={() => onToggleCategory(c)}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onOpenCart={onOpenCart}
            />
          ))}
        </div>

        {items.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-sm font-semibold text-white/85">No results</div>
            <div className="mt-2 text-sm text-white/55">
              Thử đổi bộ lọc hoặc từ khóa tìm kiếm.
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
