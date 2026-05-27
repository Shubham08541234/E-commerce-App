import { useEffect, useState } from "react";
import { products } from "../Assets/frontend_assets/assets";
import { ShopContext } from "./ShopContext";
import { toast } from "react-toastify";

const ShopContextProvider = (props) => {
  const [active, setActive] = useState(false);

  const [cartItems, setCartItems] = useState({});

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
                if(cartItems[items][item] > 0){
                    totalCnt += cartItems[items][item];
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
    return totalCnt;
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
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
