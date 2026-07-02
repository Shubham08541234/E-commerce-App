import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price:{type: Number, requrired: true},
    image:{type: Array, requrired: true},
    category:{type: String, requrired: true},
    subCategory:{type: String, requrired: true},
    sizes:{type: Array, required: true},
    bestSeller:{type: Boolean},
},{timestamps:true});

const productModel = mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;