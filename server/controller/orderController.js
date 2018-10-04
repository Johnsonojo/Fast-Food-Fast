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
}

export default OrdersController;