import express from 'express';

import authValidator from '../middleware/authValidator';
import authController from '../controller/authController';

const authRoute = express.Router();

// post /auth/signup
authRoute.post('/signup', authValidator.validateSignUpInput,
    authController.signUp);

// post /auth/login
authRoute.post('/login', authValidator.validatorSignInInput,
    authController.login);

export default authRoute;