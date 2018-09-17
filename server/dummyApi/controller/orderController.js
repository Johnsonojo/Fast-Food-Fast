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

}