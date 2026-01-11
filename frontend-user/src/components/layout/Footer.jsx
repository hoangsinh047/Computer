import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold tracking-wide text-white/90">NOVA RIG</div>
            <p className="mt-3 text-sm text-white/60">
              Phụ kiện & linh kiện máy tính chính hãng. UI premium, trải nghiệm mượt,
              tối ưu cho mua sắm.
            </p>
            <div className="mt-5 flex items-center gap-3 text-white/70">
              <a
                className="ring-focus inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                href="#"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                className="ring-focus inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                href="#"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a
                className="ring-focus inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                href="#"
                aria-label="YouTube"
              >
                <span className="text-sm font-bold">yt</span>
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/85">Thông tin</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white/85">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/85">
                  Hệ thống cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/85">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/85">Chính sách</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white/85">
                  Bảo hành & đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/85">
                  Thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/85">
                  Vận chuyển
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/85">Nhận ưu đãi</div>
            <p className="mt-3 text-sm text-white/60">
              Đăng ký email để nhận deal linh kiện mới mỗi tuần.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                className="ring-focus w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40"
                placeholder="Email của bạn"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} NOVA RIG. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70">
              Terms
            </a>
            <a href="#" className="hover:text-white/70">
              Privacy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

