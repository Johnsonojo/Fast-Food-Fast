import express from 'express';

import authenticator from '../middleware/authenticate';
import orderValidator from '../middleware/orderValidator';
import ordersController from '../controller/orderController';

const orderRoute = express.Router();

// get /orders
orderRoute.get(
  '/',
  authenticator.authenticateAdmin,
  ordersController.getAllOrder
);

// get /orders/:orderId
orderRoute.get(
  '/:orderId',
  authenticator.authenticateAdmin,
  orderValidator.validateOrderId,
  ordersController.getOneOrder
);

// post /orders
orderRoute.post(
  '/',
  authenticator.authenticateUser,
  orderValidator.validateOrderBody,
  ordersController.postAnOrder
);

// put /orders/:orderId
orderRoute.put(
  '/:orderId',
  authenticator.authenticateAdmin,
  orderValidator.validateOrderStatus,
  ordersController.updateOrderStatus
);

// get users/userId/orders
orderRoute.get(
  '/:userId/orders',
  authenticator.authenticateUser,
  orderValidator.validateOrderHistory,
  ordersController.userOrderHistory
);

// delete users/userId/order
orderRoute.delete(
  '/:userId/orders/:orderId',
  authenticator.authenticateUser,
  ordersController.deleteAnOrder
);
export default orderRoute;
