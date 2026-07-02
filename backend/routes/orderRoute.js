import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorPay, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const placeOrderRouter = express.Router();

// Admin features
placeOrderRouter.post('/list',adminAuth, allOrders)
placeOrderRouter.post('/status',adminAuth, updateStatus)

// payment features

placeOrderRouter.post('/place', authUser, placeOrder);
placeOrderRouter.post('/stripe', authUser, placeOrderStripe);
placeOrderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// verify payment
placeOrderRouter.post('/verifyStripe', authUser, verifyStripe)
placeOrderRouter.post('/verifyRazorpay', authUser, verifyRazorPay)

// user feature
placeOrderRouter.post('/userorders', authUser, userOrders);

export default placeOrderRouter;