// importing express library
import express from 'express';

// immporting the order route
import order from './orderRoute';

// importing router for order class
const router = express.Router();

// creating api for order routes
router.use('/api/v1/orders', order);

export default router;