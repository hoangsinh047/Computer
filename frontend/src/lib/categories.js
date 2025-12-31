export const NAV_CATEGORIES = [
  'PC Theo bộ',
  'Laptop',
  'MAIN',
  'CPU',
  'RAM',
  'VGA',
  'Ổ cứng',
  'Case',
  'Màn hình',
  'Gaming Gear',
  'Tản nhiệt',
]

// Mapping from nav labels -> product categories present in mock data.
// Keep these internal categories stable because filters/pages rely on `product.category`.
export const NAV_TO_PRODUCT_CATEGORIES = {
  'PC Theo bộ': ['PC Build'],
  Laptop: ['Laptop'],
  MAIN: ['MAIN'],
  CPU: ['CPU'],
  RAM: ['RAM'],
  VGA: ['GPU'],
  'Ổ cứng': ['SSD', 'HDD'],
  Case: ['Case'],
  'Màn hình': ['Monitor'],
  'Gaming Gear': ['Gaming Gear'],
  'Tản nhiệt': ['Cooling'],
}

export function slugifyCategory(label) {
  return label
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function categoryLabelFromSlug(slug) {
  return NAV_CATEGORIES.find((c) => slugifyCategory(c) === slug) || null
}
