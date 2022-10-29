import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/Navigation.component'
import Authentication from './routes/authenication/authentication.component'

const Shop = () => {
  return <h3>shop page </h3>
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route element={<Home />} index={true} />
        <Route element={<Shop />} path='shop' />
        <Route element={<Authentication />} path='auth' />
      </Route>
    </Routes>
  )
}

export default App
