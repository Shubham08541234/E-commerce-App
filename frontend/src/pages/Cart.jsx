import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components";
import { assets } from "../Assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
const Cart = () => {
  const { products, currency, cartItems, deleteCartItem, updateCartQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // const [cartVal, setCartVal] = useState(second)

  const settingData = () => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  };

  useEffect(() => {
    settingData();
  }, [cartItems]);
  return (
    <div className=" border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item,idx) => {
            console.log(products);
            const productData = products.find(prod => prod._id === item._id);
        
            return (
              <div key={`${item._id}-${idx}`} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.image[0]} alt="img" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => updateCartQuantity(item._id, item.size, Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 sm:py-1" type="number" min={1} Value={item.quantity}/>
                <img 
                onClick={ () => deleteCartItem(item._id, item.size)}
                className="w-4 sm:w-5 mr-4 cursor-pointer" 
                src={assets.bin_icon} 
                alt="img"
                />
              </div>
            )
          })
        }
      </div>

      <CartTotal />
      <button onClick={() => navigate('/place-order')} className='border bg-gray-800 mt-4 px-4 py-2.5 text-gray-100'>Proceed To Checkout</button>
    </div>
  );
};
export default Cart;
