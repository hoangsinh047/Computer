import { Container } from '../layout/Container'

const items = [
  {
    title: 'Chính hãng 100%',
    desc: 'Đầy đủ VAT, nguồn gốc rõ ràng từ nhà phân phối uy tín.',
  },
  {
    title: 'Bảo hành chuẩn hãng',
    desc: 'Quy trình RMA minh bạch, hỗ trợ kiểm tra nhanh.',
  },
  {
    title: 'Giao nhanh & an toàn',
    desc: 'Đóng gói chống sốc, hẹn giờ nhận, theo dõi đơn hàng.',
  },
  {
    title: 'Tư vấn cấu hình',
    desc: 'Gợi ý build theo ngân sách, tối ưu hiệu năng/giá.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-18">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white/92">
              Vì sao chọn NOVA RIG
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Cam kết trải nghiệm mua sắm premium và dịch vụ hậu mãi chuẩn.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="card p-5 transition hover:-translate-y-0.5 hover:bg-white/6"
            >
              <div className="text-sm font-semibold text-white/88">{it.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/60">{it.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

