import React from 'react'
import { Outlet } from 'react-router-dom'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'

const Home = () => {
  return (
    <section className='flex flex-col min-h-screen'>
      <Navbar />

      <main className='flex-1 flex flex-col justify-center items-center'>
        <Container>
          <Outlet />
        </Container>
      </main>
    </section>
  )
}

export default Home
