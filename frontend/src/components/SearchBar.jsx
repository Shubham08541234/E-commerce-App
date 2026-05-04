import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const SearchBar = ({searchVal, setSearchVal}) => {

  const { active, setActive } = useContext(ShopContext);
  return (
    <div className={`flex justify-center px-8 py-3 ${active? "": "hidden"}`}>
      <div className='w-full flex justify-center gap-2 sm:gap-5 items-center'>
        <input className='inline-block px-4 py-1.5 rounded-lg text-white bg-gray-500/50 w-full sm:w-[50%]' type="text" placeholder='search' value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
        <span className='basis-1 cursor-pointer' onClick={() => setActive(false)}>❌</span>
      </div>
    </div>
  )
}

export default SearchBar
