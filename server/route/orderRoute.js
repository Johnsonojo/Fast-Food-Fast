import express from 'express';

import authenticator from '../middleware/authenticate';
import orderValidator from '../middleware/orderValidator';
import ordersController from '../controller/orderController';

const orderRoute = express.Router();

// get /orders
orderRoute.get('/', authenticator.authenticateAdmin,
    ordersController.getAllOrder);

// get /orders/:orderId
orderRoute.get('/:orderId', authenticator.authenticateAdmin,
    orderValidator.validateOrderId,
    ordersController.getOneOrder);
export default orderRoute;