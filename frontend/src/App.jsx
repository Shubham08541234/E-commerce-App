import { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router";
import "./App.css";
import { Footer, NavBar, SearchBar } from "./components";

function App() {
  const [count, setCount] = useState(0);

  const [active, setActive] = useState(true);

  return (
    <>
      <header>
        <NavBar setActive={setActive} active={active}/>
      </header>
      <main className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
