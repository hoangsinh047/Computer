import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'

export function NotFoundPage() {
  return (
    <main>
      <Container>
        <div className="py-16">
          <div className="card p-10 text-center">
            <div className="text-sm font-semibold text-white/85">404</div>
            <div className="mt-2 text-xl font-semibold text-white/92">Không tìm thấy trang</div>
            <div className="mt-3 text-sm text-white/55">Quay lại trang chủ để tiếp tục mua sắm.</div>
            <Link to="/" className="btn-primary mt-6 inline-flex">
              Về trang chủ
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

