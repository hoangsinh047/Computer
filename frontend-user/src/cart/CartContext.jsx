import { useContext, useEffect, useMemo, useReducer } from 'react'
import { readCartFromStorage, writeCartToStorage } from './cartStorage'
import { cartCount, cartReducer } from './cartReducer'
import { CartContext } from './CartContextBase'

export function CartProvider({ children }) {
  const [itemsById, dispatch] = useReducer(cartReducer, {})

  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: readCartFromStorage() })
  }, [])

  useEffect(() => {
    writeCartToStorage(itemsById)
  }, [itemsById])

  const api = useMemo(() => {
    const count = cartCount(itemsById)

    return {
      itemsById,
      count,
      add: (id, qty = 1) => dispatch({ type: 'ADD', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [itemsById])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
