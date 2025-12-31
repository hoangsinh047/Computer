import { useOutletContext } from 'react-router-dom'
import { CategoryPage } from './CategoryPage'
import { useCart } from '../cart/CartContext'

export function CategoryPageWrapper() {
  const cart = useCart()
  const { onOpenCart } = useOutletContext()

  return <CategoryPage onAddToCart={(id) => cart.add(id, 1)} onOpenCart={onOpenCart} />
}
