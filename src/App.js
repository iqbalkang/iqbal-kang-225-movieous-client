import { Routes, Route, useNavigate } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Verification from './pages/Verification'
import useAuth from './hooks/useAuth'
import AdminRouter from './pages/AdminRouter'
import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import SingleMovie from './components/users/SingleMovie'
import Reviews from './pages/Reviews'

function App() {
  const { authInfo } = useAuth()
  const { user } = authInfo
  const navigate = useNavigate()

  // console.log(user)
  if (user?.isAdmin) {
    return <AdminRouter />
  }

  return (
    <div className='dark:bg-body bg-white text-[#555] dark:text-[#ddd] min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='verification' element={<Verification />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='movie/:movieId' element={<SingleMovie />} />
          <Route path='movie/reviews/:movieId' element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
