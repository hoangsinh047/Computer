import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatVND } from '../lib/format'
import { useCart } from './CartContext'

function getProduct(id) {
  return products.find((p) => p.id === id) || null
}

export function CartDrawer({ open, onClose }) {
  const cart = useCart()

  if (!open) return null

  const lines = Object.entries(cart.itemsById)
    .map(([id, qty]) => ({ id, qty, product: getProduct(id) }))
    .filter((x) => x.product)

  const subtotal = lines.reduce((acc, l) => acc + l.product.price * l.qty, 0)

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[rgb(var(--bg))] shadow-2xl">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <div>
            <div className="text-sm font-semibold text-white/90">Giỏ hàng</div>
            <div className="text-xs text-white/50">{cart.count} sản phẩm</div>
          </div>
          <button
            className="ring-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {lines.length === 0 ? (
            <div className="card p-6 text-center">
              <div className="text-sm font-semibold text-white/85">Chưa có sản phẩm</div>
              <div className="mt-2 text-sm text-white/55">Thêm sản phẩm để bắt đầu mua sắm.</div>
              <button className="btn-primary mt-5 w-full" onClick={onClose}>
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {lines.map(({ id, qty, product }) => (
                <div key={id} className="card p-3">
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-16 w-20 rounded-xl object-cover"
                      loading="lazy"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white/55">{product.brand}</div>
                      <div className="mt-1 text-sm font-semibold text-white/90 line-clamp-2">
                        {product.title}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white/90">
                        {formatVND(product.price)}
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5">
                          <button
                            className="ring-focus h-9 w-9 rounded-2xl text-white/80 hover:bg-white/10"
                            onClick={() => cart.setQty(id, qty - 1)}
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <input
                            className="w-12 bg-transparent text-center text-sm font-semibold text-white/90 focus:outline-none"
                            value={qty}
                            onChange={(e) => cart.setQty(id, Number(e.target.value))}
                            inputMode="numeric"
                          />
                          <button
                            className="ring-focus h-9 w-9 rounded-2xl text-white/80 hover:bg-white/10"
                            onClick={() => cart.setQty(id, qty + 1)}
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="ring-focus rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/8"
                          onClick={() => cart.remove(id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (always visible) */}
        <div className="shrink-0 border-t border-white/10 p-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)]">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Tạm tính</span>
            <span className="font-semibold text-white/90">{formatVND(subtotal)}</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="ring-focus rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/8"
              onClick={() => {
                cart.clear()
                onClose()
              }}
              disabled={lines.length === 0}
            >
              Clear
            </button>
            <Link
              to="/cart"
              className={`ring-focus rounded-2xl px-4 py-3 text-center text-sm font-semibold transition ${
                lines.length === 0 ? 'pointer-events-none bg-white/5 text-white/35' : 'btn-primary'
              }`}
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
