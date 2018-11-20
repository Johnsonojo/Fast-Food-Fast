import express from 'express';

import menuController from '../controller/menuController';
import authenticator from '../middleware/authenticate';
import menuValidator from '../middleware/menuValidator';

const menuRoute = express.Router();

// get /menu
menuRoute.get('/',
    authenticator.authenticateUser,
    menuController.getAllMenu);

// post /menu
menuRoute.post('/',
    authenticator.authenticateAdmin,
    menuValidator.validateMenuInput,
    menuController.postOneMenu);

// delete /menu/menuId
menuRoute.delete('/:menuId',
    authenticator.authenticateAdmin,
    menuValidator.validateMenuId,
    menuController.deleteOneMenu);

export default menuRoute;