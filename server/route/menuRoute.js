import express from 'express';

import menuController from '../controller/menuController';
import authenticator from '../middleware/authenticate';
import menuValidator from '../middleware/menuValidator';


const menuRoute = express.Router();

// get /menu
menuRoute.get('/', authenticator.authenticateUser,
    menuController.getAllMenu);

// post /menu
menuRoute.post('/', authenticator.authenticateUser,
    authenticator.authenticateAdmin,
    menuValidator.validateMenuInput,
    menuController.postOneMenu);

export default menuRoute;