import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        
        let cartData = userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        return res.json({success: true, message: "Added to cart successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
const updateCart = async (req, res) => {
    try {
        
        const { userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if(quantity == 0){
            delete  cartData[itemId][size];
            if(Object.keys(cartData[itemId]).length == 0){
                delete cartData[itemId];
            }
        }
        else cartData[itemId][size] = quantity;

        await userModel.findOneAndUpdate({_id: userId}, {cartData});
        return res.json({success: true, message: "cart data updated successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
const getUserCart = async (req, res) => {

    try {
        const { userId} = req.body;
        const userData = await userModel.findById(userId);

        res.json({success: true, cartData: userData.cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


export { addToCart, updateCart, getUserCart };