
import { products } from "../Assets/frontend_assets/assets";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = (props) => {

    const currency = '$';
    const deliveryFee = 10;
    const value = {
        products,
        currency,
        deliveryFee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider