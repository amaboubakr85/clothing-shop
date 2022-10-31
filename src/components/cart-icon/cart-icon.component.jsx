import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bad.svg'
import { CartItemsContext } from '../../contexts/cart-items.context'
import { useContext } from 'react'
const CartIcon = () => {
  const { showCartItems, setShowCartItems } = useContext(CartItemsContext)

  return (
    <div className='cart-icon-container' onClick={() => setShowCartItems(!showCartItems)}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon
