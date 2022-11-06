import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/Navigation.component'
import Authentication from './routes/authenication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route element={<Home />} index={true} />
        <Route element={<Shop />} path='shop/*' />
        <Route element={<Authentication />} path='auth' />
        <Route element={<Checkout />} path='checkout' />
      </Route>
    </Routes>
  )
}

export default App
