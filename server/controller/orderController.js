import db from '../models/dbConnect';

class OrdersController {
    /**
     * @description get all orders
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static getAllOrder(req, res) {
        db.query('SELECT * from orders')
            .then((result) => {
                res.status(200).json({
                    status: 'success',
                    message: 'All order fetched',
                    data: result.rows,
                });
            })
            .catch(error => res.status(500).json({
                status: 'error',
                mesage: 'internal server error',
                error
            }));
    }

    /**
     * @description get an orders
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static getOneOrder(req, res) {
        const { orderId } = req.params;
        db.query(`SELECT * FROM orders WHERE orders.id = ${[orderId]}`)
            .then((result) => {
                if (result.rowCount < 1) {
                    return res.status(404).json({
                        status: 'Failure',
                        message: 'Order not found',
                    });
                }
                return res.status(200).json({
                    status: 'Success',
                    message: `Order ${orderId} successfully fetched`,
                    data: result.rows
                });
            })
            .catch(error => res.status(500).send({
                status: 'Failure',
                mesage: 'Internal server error',
                error
            }));
    }
}

export default OrdersController;