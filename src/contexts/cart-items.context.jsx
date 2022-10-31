import { createContext, useState } from 'react'

export const CartItemsContext = createContext({
  cartItems: [],
  showCartItems: false,
  setShowCartItems: () => {},
})

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState()
  const [showCartItems, setShowCartItems] = useState(false)
  const value = {
    cartItems,
    showCartItems,
    setShowCartItems,
  }
  return <CartItemsContext.Provider value={value}>{children}</CartItemsContext.Provider>
}
