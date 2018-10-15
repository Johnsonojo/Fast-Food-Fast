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

        db.query('SELECT * from menu where foodName = $1', [foodName])
            .then((foodExists) => {
                if (!foodExists) {
                    return res.status(409).json({
                        status: 'failure',
                        message: 'Menu does not exist in the database',
                    });
                }
                return db.query('INSERT INTO orders(foodName, foodPrice, qty, address, phone, totalAmount, user_id)' +
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
            })
            .catch((error) => {
                res.status(500).json({
                    status: 'Failure',
                    message: 'Internal server error',
                    error
                });
            });
    }
}

export default OrdersController;