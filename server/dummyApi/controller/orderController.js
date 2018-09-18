// import the orders database
import orderDb from '../model/orders';

// import the users database
import userDb from '../model/users';

/**
 * @description A class for orders
 */
export default class Order {
    /**
     * @description gets all orders
     * @param {object} req
     * @param {object} res
     * @return {object}
     */
    static getAllOrders(req, res) {
        return res.status(200).json({
            status: 'success',
            message: 'All orders fetched',
            data: orderDb,
        });
    }

    /**
     * @description gets an order
     * @param {object} req
     * @param {object} res
     * @return {object}
     */
    static getOneOrder(req, res) {
        const orderId = parseInt(req.params.orderId, 10);

        const result = orderDb.find(order => order.orderId === orderId);

        if (!result) {
            res.status(404).json({
                status: 'failure',
                message: 'Order not found',
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: `Order  ${result.orderId}  fetched`,
                data: result,
            });
        }
    }

    /**
     * @description creates a new order
     * @param {object} req
     * @param {object} res
     * @return {object}
     */
    static addNewOrder(req, res) {
        const foodItems = [];
        const totalAmount = req.body.qty * req.body.foodPrice;
        const addFood = {
            foodName: req.body.foodName,
            foodPrice: req.body.foodPrice,
            qty: req.body.qty,
        };
        foodItems.push(addFood);

        let userId = userDb.length + 1;
        const newOrder = {
            orderId: orderDb.length + 1,
            userId,
            foodItems,
            orderStatus: req.body.orderStatus,
            totalAmount,
            deliveryAddress: req.body.deliveryAddress,
            orderDate: new Date(),
        };
        orderDb.push(newOrder);
        return res.status(201).json({
            status: 'success',
            message: 'New order was created',
            data: orderDb[orderDb.length - 1],
        });
    }
}