import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Container } from '../components/layout/Container'
import { formatVND } from '../lib/format'
import { useCart } from '../cart/CartContext'

export function CartPage() {
  const cart = useCart()

  const lines = Object.entries(cart.itemsById)
    .map(([id, qty]) => ({ id, qty, product: products.find((p) => p.id === id) }))
    .filter((x) => x.product)

  const subtotal = lines.reduce((acc, l) => acc + l.product.price * l.qty, 0)

  return (
    <main>
      <Container>
        <div className="py-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white/92">Giỏ hàng</h1>
              <p className="mt-2 text-sm text-white/60">Xem lại sản phẩm và điều chỉnh số lượng.</p>
            </div>
            <Link
              to="/"
              className="ring-focus rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/8"
            >
              Tiếp tục mua sắm
            </Link>
          </div>

          {lines.length === 0 ? (
            <div className="card mt-8 p-8 text-center">
              <div className="text-sm font-semibold text-white/85">Giỏ hàng trống</div>
              <div className="mt-2 text-sm text-white/55">Hãy thêm sản phẩm ở trang danh mục.</div>
              <Link to="/" className="btn-primary mt-5 inline-flex">
                Quay lại trang chủ
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-3">
                {lines.map(({ id, qty, product }) => (
                  <div key={id} className="card p-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-20 w-28 rounded-2xl object-cover"
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

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/5">
                            <button
                              className="ring-focus h-10 w-10 rounded-2xl text-white/80 hover:bg-white/10"
                              onClick={() => cart.setQty(id, qty - 1)}
                            >
                              −
                            </button>
                            <input
                              className="w-14 bg-transparent text-center text-sm font-semibold text-white/90 focus:outline-none"
                              value={qty}
                              onChange={(e) => cart.setQty(id, Number(e.target.value))}
                              inputMode="numeric"
                            />
                            <button
                              className="ring-focus h-10 w-10 rounded-2xl text-white/80 hover:bg-white/10"
                              onClick={() => cart.setQty(id, qty + 1)}
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-white/90">
                              {formatVND(product.price * qty)}
                            </div>
                            <button
                              className="ring-focus rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 hover:bg-white/8"
                              onClick={() => cart.remove(id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="card h-fit p-5">
                <div className="text-sm font-semibold text-white/90">Tóm tắt</div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-white/70">
                    <span>Tạm tính</span>
                    <span className="font-semibold text-white/90">{formatVND(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span>Vận chuyển</span>
                    <span className="text-white/50">Tính khi thanh toán</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span>Giảm giá</span>
                    <span className="text-white/50">—</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold text-white/85">Tổng</span>
                    <span className="font-semibold text-white/95">{formatVND(subtotal)}</span>
                  </div>
                </div>

                <button className="btn-primary mt-5 w-full">Thanh toán</button>

                <button
                  className="ring-focus mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/8"
                  onClick={() => cart.clear()}
                >
                  Clear cart
                </button>
              </aside>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

