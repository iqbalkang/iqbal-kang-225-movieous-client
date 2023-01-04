import { Routes, Route } from 'react-router-dom'
import ConfirmPassword from './pages/ConfirmPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Verification from './pages/Verification'

function App() {
  return (
    <div className='dark:bg-body bg-white text-[#555] dark:text-[#ddd] min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='verification' element={<Verification />} />
          <Route path='confirm-password' element={<ConfirmPassword />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
