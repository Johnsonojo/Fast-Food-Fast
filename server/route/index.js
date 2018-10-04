// importing express library
import express from 'express';

// importing the various routes
import user from './userRoute';
import menu from './menuRoute';
import order from './orderRoute';

// importing router for question class
const router = express.Router();

// creating api for users, menu and class
router.use('/api/v1/auth', user);
router.use('/api/v1/menu', menu);
router.use('/api/v1/orders', order);

export default router;