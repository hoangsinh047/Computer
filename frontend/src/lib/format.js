export function formatVND(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

