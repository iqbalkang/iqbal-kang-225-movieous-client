import React from 'react'
import { Outlet } from 'react-router-dom'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'

const Home = () => {
  const ctx = useAuth()
  // console.log(ctx)
  return (
    <section className='flex flex-col h-screen min-h-screen'>
      <Navbar />

      <main className='flex-1'>
        <Container>
          <Outlet />
        </Container>
      </main>
    </section>
  )
}

export default Home
