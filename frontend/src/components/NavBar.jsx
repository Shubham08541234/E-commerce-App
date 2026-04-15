import React, { useEffect, useState } from "react";
import { assets } from "../Assets/frontend_assets/assets";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="flex items-center justify-between py-5 px-10 font-medium">
      <Link to='/'><img src={assets.logo} className="w-36" alt="logoImage" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="searchIcon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profileIcon"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cartIcon" className="w-5 min-w-5" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-[50%] text-[8px]">
            10
          </p>
        </Link>
      </div>
      <img
        onClick={() => setVisible(true)}
        src={assets.menu_icon}
        className="w-5 cursor-pointer sm:hidden"
        alt="menuIcon"
      />

      <div
        className={`sm:hidden absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="dropdownIcon"
            />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
