
import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

// funtion to add product
const addProduct =  async(req, res) =>{

    try {
        const { name, description, price, image, category, subCategory, sizes, bestSeller} = req.body;
        console.log(req.files);
    
        const image1 = req.files.image1?req.files.image1[0]:undefined;
        const image2 = req.files.image2?req.files.image2[0]:undefined;
        const image3 = req.files.image3?req.files.image3[0]:undefined;
        const image4 = req.files.image4?req.files.image4[0]:undefined;

        const images = [image1, image2, image3, image4].filter(img => img !== undefined);

        const imageUrl = await Promise.all(images.map(async (img) => {
            const result = await cloudinary.uploader.upload(img.path, {resource_type: 'image'});
            return result.secure_url;
        }))
    
        const product = {
            name,
            description,
            price: Number(price),
            image: imageUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller == "true"? true:false,
        }

        const productToDb = new productModel(product);
        await productToDb.save();
        
        return res.json({success: true, msg:"Product Added successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg:error.message})
    }
}

// funtion to list product
const listProduct =  async(req, res) =>{
    try {
        const products = await productModel.find();
        return res.json({success:true, products});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg:error.message});
    }
}

// funtion to remove product
const removeProduct = async (req, res) =>{
    try {
        const rmProd = await productModel.findByIdAndDelete(req.body._id);
        return res.json({success: true, rmProd});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg:error.message});
    }
}
// funtion to single product info
const singleProductInfo = async (req, res) =>{
    try {
        const prod = await productModel.findById(req.body._id);
        return res.json({success: true, prod});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg:error.message});
    }
}

export {addProduct, listProduct, removeProduct, singleProductInfo };
