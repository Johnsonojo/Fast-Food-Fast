import orderDb from '../model/orders';

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

}