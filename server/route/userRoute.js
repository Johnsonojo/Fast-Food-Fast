import express from 'express';

import userValidator from '../middleware/userValidator';
import userController from '../controller/userController';

const userRoute = express.Router();

// post /auth/signup
userRoute.post('/signup', userValidator.validateSignUpInput,
    userController.signUp);

// post /auth/login
userRoute.post('/login', userValidator.validatorSignInInput,
    userController.login);

export default userRoute;