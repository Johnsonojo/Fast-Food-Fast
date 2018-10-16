import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/dbConnect';

dotenv.config();

const secret = process.env.JWT_SECRET;

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
                if (!result) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'Orders not found',
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: 'All order fetched',
                    data: result.rows,
                });
            });
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
                        status: 'failure',
                        message: 'Order not found',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    message: `Order ${orderId} successfully fetched`,
                    data: result.rows
                });
            });
    }

    /**
     * @description post an order
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static postAnOrder(req, res) {
        const {
            foodName,
            foodPrice,
            qty,
            address,
            phone,
        } = req.body;
        const totalAmount = qty * foodPrice;

        const token = req.body.token || req.query.token || req.headers.token;

        const verifiedToken = jwt.verify(token, secret);
        req.token = verifiedToken;
        const userId = req.token.id;

        db.query('INSERT INTO orders(foodName, foodPrice, qty, address, phone, totalAmount, user_id)' +
                ' values($1, $2, $3, $4, $5, $6, $7) RETURNING *', [foodName, foodPrice, qty, address, phone, totalAmount, userId])
            .then(result => res.status(201).json({
                status: 'success',
                message: 'Order placed successfully',
                data: result.rows
            }))
            .catch((error) => {
                res.status(500).json({
                    status: 'failure',
                    message: 'Internal server error',
                    error
                });
            });
    }

    /**
     * @description Update the status of an order
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static updateOrderStatus(req, res) {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        db.query(`SELECT * FROM orders WHERE orders.id = ${[orderId]}`)
            .then((result) => {
                if (result.rowCount < 1) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'Order not found',
                    });
                }
                return db.query('UPDATE orders SET orderstatus = $1 WHERE orders.id = $2', [orderStatus, orderId])
                    .then((result) => {
                        res.status(200).json({
                            status: 'success',
                            message: `Status of order ${orderId} successfully modified by you`,
                            data: `Order status is ${orderStatus}`
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            status: 'failure',
                            message: 'Internal server error',
                            error
                        });
                    });
            });
    }

    /**
     * @description get the order history of a user
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static userOrderHistory(req, res) {
        const { userId } = req.params;
        db.query('SELECT * FROM orders WHERE user_id=$1', [userId])
            .then((result) => {
                if (result.rowCount === 0) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'User not found',
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: 'orders fetched successfully',
                    data: result.rows,
                });
            });
    }
}

export default OrdersController;