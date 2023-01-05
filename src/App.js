import { Routes, Route } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
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
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
