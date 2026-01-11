import { formatVND } from '../../lib/format'
import { RatingStars } from './RatingStars'
import { useToast } from '../ui/ToastContext'

export function ProductCard({ product, onAddToCart, onOpenCart }) {
  const toast = useToast()

  return (
    <div className="card group overflow-hidden transition hover:-translate-y-0.5 hover:bg-white/6">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-transparent to-transparent opacity-70" />

        <div className="absolute left-3 top-3 flex gap-2">
          {product.badge ? (
            <span
              className={`badge ${
                product.badge === 'Sale'
                  ? 'border-indigo-400/30 bg-indigo-500/15 text-indigo-200'
                  : product.badge === 'New'
                    ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
                    : 'border-emerald-300/25 bg-emerald-400/10 text-emerald-200'
              }`}
            >
              {product.badge}
            </span>
          ) : null}

          {!product.inStock ? (
            <span className="badge border-rose-300/25 bg-rose-500/10 text-rose-200">
              Out of stock
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white/55">{product.brand}</div>
            <div className="mt-1 text-sm font-semibold text-white/90 line-clamp-2">
              {product.title}
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/65">
            {product.category}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-white/45">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-white/92">
              {formatVND(product.price)}
            </div>
            {product.compareAtPrice ? (
              <div className="text-xs text-white/45 line-through">
                {formatVND(product.compareAtPrice)}
              </div>
            ) : null}
          </div>

          <button
            className={`ring-focus rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              product.inStock
                ? 'bg-white/10 hover:bg-white/14'
                : 'cursor-not-allowed bg-white/5 text-white/35'
            }`}
            onClick={() => {
              onAddToCart(product.id)
              toast.push('Đã thêm vào giỏ hàng')
              onOpenCart?.()
            }}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
