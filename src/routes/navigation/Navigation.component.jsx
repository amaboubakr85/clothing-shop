import { Fragment, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as ShopLogo } from '../../assets/logo.svg'
import './navigation.styles.scss'
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../cart-dropdown/cart-dropdown.component'
import { CartItemsContext } from '../../contexts/cart-items.context'
const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  //console.log(currentUser)

  const signOutHandler = async () => {
    await signOutUser()
  }

  const { showCartItems } = useContext(CartItemsContext)

  return (
    <Fragment>
      {/* Header and nav */}
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <div>
            <ShopLogo className='logo' />
          </div>
        </Link>

        <div className='nav-links-container'>
          <Link to='/shop' className='nav-link'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link to='/auth' className='nav-link'>
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
        {showCartItems && <CartDropdown />}
      </div>
      {/*  Body  */}
      <Outlet />
      {/* Footer  */}
      <div className='footer'>
        <h5>Crown Clothing Shop , All Rights Reserved , copyright 2022</h5>
      </div>
    </Fragment>
  )
}
export default Navigation
