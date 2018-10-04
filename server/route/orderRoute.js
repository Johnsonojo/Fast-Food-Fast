import express from 'express';

import authenticator from '../middleware/authenticate';
import ordersController from '../controller/orderController';

const orderRoute = express.Router();

// get /orders
orderRoute.get('/', authenticator.authenticateAdmin,
    ordersController.getAllOrder);

export default orderRoute;