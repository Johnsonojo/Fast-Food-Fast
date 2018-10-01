import express from 'express';

// import authValidator from '../middleware/authValidator';
import menuController from '../controller/menuController';

const menuRoute = express.Router();

// // post /auth/signup
// menuRoute.post('/signup', authValidator.validateSignUpInput,
//     authController.signUp);

// get /menu
menuRoute.get('/', menuController.getAllMenu);

export default menuRoute;