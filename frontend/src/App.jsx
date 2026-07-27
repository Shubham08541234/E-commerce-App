import { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router";
import "./App.css";
import { Footer, NavBar, SearchBar } from "./components";
import { ToastContainer } from 'react-toastify'

function App() {

  const [active, setActive] = useState(true);

  return (
    <>
      <header>
        <NavBar setActive={setActive} active={active}/>
      </header>
      <main className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
