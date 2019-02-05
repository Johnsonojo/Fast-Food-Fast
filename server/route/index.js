// importing express library
import express from 'express';

// importing the various routes
import user from './userRoute';
import menu from './menuRoute';
import order from './orderRoute';
import auth from './authRoute';

const router = express.Router();

router.use('/api/v1/auth', user);
router.use('/api/v1/menu', menu);
router.use('/api/v1/orders', order);
router.use('/api/v1/users', order);
router.use('/api/v1/user', auth);

export default router;
