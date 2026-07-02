import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import placeOrderRouter from './routes/orderRoute.js';

const app = express();

const port = process.env.PORT || 4000

mongoDB();

connectCloudinary();

app.use(express.json())

app.use(cors())


// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', placeOrderRouter);


app.get('/', (req, res) => {
    res.send("API Working");
})


app.listen(port, () => {
    console.log("Server started on port: ", port);
})