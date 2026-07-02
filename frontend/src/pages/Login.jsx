import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
const Login = () => {

  
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {token, setToken, backendUrl} = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      navigate('/');
    }
  },[token])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
  },[])

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      if(currentState === "Login"){
        const response = await axios.post(`${backendUrl}/api/user/login`, {email, password})
        console.log(response);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }else {
        const response = await axios.post(`${backendUrl}/api/user/register`, {name, email, password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      <input type="text" className={`w-full ${currentState === "Login"? 'hidden': ''} px-3 py-2 border border-gray-800`} value={name} onChange={(e)=> setName(e.target.value)} placeholder='name'/>
      <input type="email" className='w-full px-3 py-2 border border-gray-800' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='password' required/>
      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>Rorgot your password</p>
        {
          currentState === 'Sign Up'?
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>:
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
        }
      </div>

      <button className='bg-black cursor-pointer text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'? 'Sign In': 'Sign Up'}</button>
    </form>
  )
}
export default Login
