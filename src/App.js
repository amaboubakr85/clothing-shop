import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/Navigation.component'
import SignIn from './routes/sign-in/sign-in.component'

const Shop = () => {
  return <h3>shop page </h3>
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route element={<Home />} index={true} />
        <Route element={<Shop />} path='shop' />
        <Route element={<SignIn />} path='sign-in' />
      </Route>
    </Routes>
  )
}

export default App
