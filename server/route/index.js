// importing express library
import express from 'express';

// importing the various routes
import user from './authRoute';
import menu from './menuRoute';

// importing router for question class
const router = express.Router();

// creating api for users and menu class
router.use('/api/v1/auth', user);
router.use('/api/v1/menu', menu);


export default router;