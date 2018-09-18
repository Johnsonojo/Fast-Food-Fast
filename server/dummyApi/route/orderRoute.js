// importing express library and order validator
import express from 'express';
import orderValidator from '../middleware/orderValidator';

// importing order controller
import orderController from '../controller/orderController';

// importing router for orders
const orderRouter = express.Router();

orderRouter.get('/', orderController.getAllOrders);

orderRouter
    .get('/:orderId',
        orderValidator.checkOrderId,
        orderController.getOneOrder);

orderRouter
    .post('/', orderValidator.checkOrderBody,
        orderController.addNewOrder);

export default orderRouter;