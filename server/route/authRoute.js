import express from 'express';

import authValidator from '../middleware/authValidator';
import authController from '../controller/authController';

const authRoute = express.Router();

// post /auth/signup
authRoute.post('/signup', authValidator.validateSignUpInput,
    authController.signUp);


export default authRoute;