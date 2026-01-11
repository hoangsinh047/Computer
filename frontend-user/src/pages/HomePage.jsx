import { useMemo } from 'react'
import { products } from '../data/products'
import { Container } from '../components/layout/Container'
import { Hero } from '../components/sections/Hero'
import { ProductCard } from '../components/catalog/ProductCard'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { NAV_CATEGORIES, NAV_TO_PRODUCT_CATEGORIES, slugifyCategory } from '../lib/categories'

const HOME_SECTIONS = ['PC Theo bộ', 'Laptop', 'MAIN', 'CPU', 'RAM', 'VGA']

const BANNERS = {
  'PC Theo bộ': {
    title: 'PC theo bộ – tối ưu hiệu năng/giá',
    desc: 'Chọn cấu hình phù hợp: gaming, creator, workstation.',
  },
  Laptop: {
    title: 'Laptop – mạnh, mỏng, premium',
    desc: 'Dòng sản phẩm chọn lọc cho học tập và làm việc.',
  },
  MAIN: {
    title: 'MAIN – nền tảng ổn định',
    desc: 'Chipset mới, VRM xịn, hỗ trợ DDR5 & PCIe.',
  },
  CPU: {
    title: 'CPU – xung nhịp & đa nhân',
    desc: 'Ryzen / Intel thế hệ mới, best value.',
  },
  RAM: {
    title: 'RAM – DDR5 tốc độ cao',
    desc: 'Dung lượng lớn, độ trễ thấp, RGB tinh tế.',
  },
  VGA: {
    title: 'VGA – đồ họa đỉnh, chơi game mượt',
    desc: 'Ray Tracing + DLSS / FSR thế hệ mới.',
  },
}

function pickProductsForSection(label) {
  const mapped = NAV_TO_PRODUCT_CATEGORIES[label] || []
  if (!mapped.length) return []
  const filtered = products.filter((p) => mapped.includes(p.category))
  return filtered.slice(0, 8)
}

export function HomePage({ onAddToCart, onOpenCart }) {
  const sections = useMemo(() => {
    const out = []
    for (const label of HOME_SECTIONS) {
      out.push({
        label,
        slug: slugifyCategory(label),
        banner: BANNERS[label],
        items: pickProductsForSection(label),
      })
    }
    return out
  }, [])

  return (
    <>
      <Hero onShopNow={() => document.getElementById('home-sections')?.scrollIntoView({ behavior: 'smooth' })} />

      <main id="home-sections">
        <Container>
          <div className="py-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white/92">
                  Sản phẩm nổi bật theo danh mục
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Trang chủ chỉ hiển thị card sản phẩm. Vào từng danh mục ở menu để dùng bộ lọc chi tiết.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-10">
              {sections.map((s) => (
                <section key={s.label} id={s.slug} className="space-y-4">
                  <div className="card overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-fuchsia-500/10" />
                      <div className="relative p-6 sm:p-8">
                        <div className="text-xs font-semibold text-white/55">{s.label}</div>
                        <div className="mt-2 text-xl font-semibold text-white/92">{s.banner?.title}</div>
                        <div className="mt-1 text-sm text-white/60">{s.banner?.desc}</div>
                        <div className="mt-4 text-xs text-white/45">
                          Tip: Dùng menu danh mục để xem đầy đủ & lọc.
                        </div>
                      </div>
                    </div>
                  </div>

                  {s.items.length === 0 ? (
                    <div className="card p-6">
                      <div className="text-sm font-semibold text-white/85">
                        Chưa có sản phẩm mock cho mục “{s.label}”.
                      </div>
                      <div className="mt-2 text-sm text-white/55">
                        Bạn có thể thêm mock data vào <code className="text-white/70">src/data/products.js</code>.
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {s.items.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onAddToCart={onAddToCart}
                          onOpenCart={onOpenCart}
                        />
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Container>

        <WhyChooseUs />
      </main>
    </>
  )
}

// Export to allow future dynamic usage
export const ALL_NAV_CATEGORIES = NAV_CATEGORIES
