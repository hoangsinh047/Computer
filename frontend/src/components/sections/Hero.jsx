import { Container } from '../layout/Container'

export function Hero({ onShopNow }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-tech opacity-90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.15)] to-[rgba(0,0,0,0.65)]" />

      <Container>
        <div className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-300 to-indigo-500" />
              Premium • High-tech • Chính hãng
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white/95 sm:text-5xl">
              Build PC&nbsp;đỉnh cao với{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                linh kiện chuẩn hiệu năng
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
              CPU, GPU, RAM, SSD & gaming gear được tuyển chọn. Layout rộng, hiệu ứng
              mượt, trải nghiệm mua sắm premium.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="btn-primary ring-focus" onClick={onShopNow}>
                Shop New Arrivals
              </button>
              <a className="btn-ghost ring-focus inline-flex items-center justify-center" href="#catalog">
                Explore Categories
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { k: 'Giao nhanh', v: '2h nội thành' },
                { k: 'Bảo hành', v: 'Tới 36 tháng' },
                { k: 'Hỗ trợ', v: 'Kỹ thuật 24/7' },
              ].map((s) => (
                <div
                  key={s.k}
                  className="card px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/6"
                >
                  <div className="text-xs font-semibold text-white/55">{s.k}</div>
                  <div className="mt-1 text-sm font-semibold text-white/88">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
