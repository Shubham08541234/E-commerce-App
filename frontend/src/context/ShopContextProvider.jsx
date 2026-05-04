
import { useState } from "react";
import { products } from "../Assets/frontend_assets/assets";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = (props) => {

    const [active, setActive] = useState(false);
    const currency = '$';
    const deliveryFee = 10;
    const value = {
        products,
        currency,
        deliveryFee,
        active,
        setActive
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider