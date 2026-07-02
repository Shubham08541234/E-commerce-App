import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext.js";
import { toast } from "react-toastify";
import axios from 'axios'




const ShopContextProvider = (props) => {
  const [active, setActive] = useState(false);
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[])

  
  const getProductData = async() => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if(response.data.success){
        setProducts(response.data.products);
      }else toast.error(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductData();
  },[])

  const addToCart = async (itemId, size) => {

    if(!size){
        toast.error('Select Product Size')
        return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if(token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/add`, {itemId, size}, {headers:{token}})
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCnt = 0;
    for (const items in cartItems) {
        for( const item in cartItems[items]){
            try {
                if(Number(cartItems[items][item]) > 0){
                    totalCnt += Number(cartItems[items][item]);
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
    return totalCnt;
  }

  const updateCartQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);
    if(cartData[itemId] && cartData[itemId][size]){
        cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if(token){
      try {
          const response = await axios.post(`${backendUrl}/api/cart/update`, {itemId, size, quantity}, {headers: {token}})
          console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`,{}, {headers: {token}});
      if(response.data.cartData){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUserCart(token);
    getCartCount();
  },[token])


  const deleteCartItem = async (itemId,size,quantity) => {
    let cartData = structuredClone(cartItems);
    delete cartData[itemId][size];
    setCartItems(cartData);

    try {
      await axios.post(`${backendUrl}/api/cart/update`,{itemId, size, quantity}, {headers: {token}});
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getCartTotal = () => {
    if(cartItems.length === 0) return 0;
    let total = 0;
    for(const items in cartItems){
      let cnt = 0;
      for(const size in cartItems[items]){
        cnt += cartItems[items][size];
      }
      total += products.find(prod => prod._id === items).price * cnt;
    }
    return total;
  }

  const currency = "$";
  const deliveryFee = 10;
  const value = {
    products,
    currency,
    backendUrl,
    deliveryFee,
    active,
    setActive,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    deleteCartItem,
    updateCartQuantity,
    getCartTotal,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
