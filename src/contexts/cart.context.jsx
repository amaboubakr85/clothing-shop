import { createContext, useState, useEffect } from 'react'

//  ! add cart item
export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

// !remove cart item
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cartItem to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  // if found and quantity is 1 , then remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

// ! clear cart item
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

// ! cart context
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  showCartItems: false,
  setShowCartItems: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalPrice: 0,
})

// !cart provider
export const CartProvider = ({ children }) => {
  const [showCartItems, setShowCartItems] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  // ! useEffect For updating the cartItems number count
  useEffect(() => {
    const totalCartCounts = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    setCartCount(totalCartCounts)
  }, [cartItems])

  // ! useEffect for cartItems total Prices
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )
    setTotalPrice(totalPrice)
  }, [cartItems])

  const value = {
    cartItems,
    showCartItems,
    setShowCartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    totalPrice,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
