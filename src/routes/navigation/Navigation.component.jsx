import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as ShopLogo } from '../../assets/logo.svg'
import './navigation.styles.scss'
const Navigation = () => {
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
          <Link to='/sign-in' className='nav-link'>
            SIGN IN
          </Link>
        </div>
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
