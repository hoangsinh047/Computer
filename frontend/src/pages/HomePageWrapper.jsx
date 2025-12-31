import { useOutletContext } from 'react-router-dom'
import { HomePage } from './HomePage'
import { useCart } from '../cart/CartContext'

export function HomePageWrapper() {
  const cart = useCart()
  const { onOpenCart } = useOutletContext()

  return (
    <HomePage
      onAddToCart={(id) => cart.add(id, 1)}
      onOpenCart={onOpenCart}
    />
  )
}
