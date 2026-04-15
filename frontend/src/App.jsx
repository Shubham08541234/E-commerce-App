import { useState } from 'react'
import { Routes, Route, Link, Outlet } from 'react-router';
import './App.css'
import { Footer, NavBar } from './components';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Outlet/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
