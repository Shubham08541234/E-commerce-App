import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { Navigate, useNavigate } from 'react-router';

const CartTotal = () => {
    const {getCartTotal} = useContext(ShopContext);
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-end'>
        <Title text1={"CART"} text2={"TOTAL"} />
      <div>Total Amount {getCartTotal()}</div>
    </div>
  )
}

export default CartTotal
