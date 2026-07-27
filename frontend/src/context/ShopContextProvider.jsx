import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext.js";
import { toast } from "react-toastify";
import { getProduct } from "../services/productServices.js";
import { addCart, deleteCart, getCart, updateCart } from "../services/cartServices.js";
import { backendUrl } from "../config/api.js";
import axios from "axios";
import { replace, useNavigate } from "react-router";



const ShopContextProvider = (props) => {

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  
  
  const getProductData = async() => {
    try {
      const response = await getProduct(backendUrl);
      if(response.data.success){
        setProducts(response.data.products);
      }else toast.error(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



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
        const response = await addCart(backendUrl, token, itemId, size);
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
          const response = await updateCart(backendUrl, token, itemId, size, quantity)
          console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

    }
  }

  
  const getUserCart = async (token) => {
    try {
      const response = await getCart(backendUrl, token);
      if(response.data.cartData){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  

  
  const deleteCartItem = async (itemId,size,quantity) => {
    let cartData = structuredClone(cartItems);
    delete cartData[itemId][size];
    setCartItems(cartData);

    try {
      await deleteCart(backendUrl, itemId, size, quantity, token);
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

const verifyUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        setLoading(false);
        navigate('/login');
        return 
    }

    try {
        const response = await axios.post(
            `${backendUrl}/api/user/verifyUser`,{},
            { headers: { token } }
        );
        if (response.data.success) {
            setToken(token);
            setUser(response.data.username);
        } else {
            localStorage.removeItem("token");
            setToken("");
            navigate('/login');
        }
    } catch (error) {
        localStorage.removeItem("token");
        setToken("");
    }

    setLoading(false);
};

useEffect(() => {
    verifyUser();
}, []);

  useEffect(() => {
    getProductData();
  },[])

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[])

  useEffect(() => {
    getUserCart(token);
    getCartCount();
  },[token])


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
    setToken,
    setUser,
    user
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
