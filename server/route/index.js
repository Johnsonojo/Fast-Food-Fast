// importing express library
import express from 'express';

// importing the various routes
import user from './authRoute';

// importing router for question class
const router = express.Router();

// creating api for users and order class
router.use('/api/v1/auth', user);


export default router;