import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const { token, setCartItems,backendUrl } = useContext(ShopContext);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const navigate = useNavigate();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token) return null;

            const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, {success, orderId}, {headers: {token}});
            if(response.data.success){
                setCartItems({});
                navigate('/orders');
            }else{
                navigate('/cart')

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    },[token])
  return (
    <div>
      <Link to='/cart'>go to cart</Link>
    </div>
  )
}

export default Verify
