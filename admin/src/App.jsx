import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router";
import SideBar from "./components/SideBar.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === ""? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet context={{token}}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
