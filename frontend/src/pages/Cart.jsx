import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
const Cart = () => {
  const { products, currency, cartItems } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

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
  }, []);
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="py-3 px-2 sm:py-5 sm:px-3">
            {
              cartData && cartData.length > 0 && cartData.map(data => (
                <div key={data._id} className="p-2 flex gap-4">
                  <img src={products.filter(prod => prod._id === data._id)[0].image[0]} className="w-25 h-auto" alt="" />
                  <div className="p-2 flex flex-col justify-between">
                      <h4>Quantity - {data.quantity}</h4>
                      <h4>size - {data.size}</h4>
                  </div>
                </div>
              ))
            }
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};
export default Cart;
