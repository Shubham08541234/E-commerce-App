import { useEffect, useState } from "react";
import { products } from "../Assets/frontend_assets/assets";
import { ShopContext } from "./ShopContext";
import { toast } from "react-toastify";

const ShopContextProvider = (props) => {
  const [active, setActive] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const cartData = localStorage.getItem("cartItem");

    return cartData? JSON.parse(cartData): {};
  });

  useEffect(() => {
    localStorage.setItem(
      "cartItem",
      JSON.stringify(cartItems)
    )
  },[cartItems])

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
  }

  const deleteCartItem = async (itemId,size) => {
    let cartData = structuredClone(cartItems);
    delete cartData[itemId][size];
    setCartItems(cartData);
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
    deliveryFee,
    active,
    setActive,
    cartItems,
    addToCart,
    getCartCount,
    deleteCartItem,
    updateCartQuantity,
    getCartTotal
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
