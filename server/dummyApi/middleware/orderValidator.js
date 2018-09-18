/**@description A class for validating various input
 */

class OrderValidator {
    /**
     * @description validates a Order id
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */

    static checkOrderId(req, res, next) {
        req.checkParams('orderId', 'Order id must not be empty').notEmpty();
        req.checkParams('orderId', 'Order id must be an integer').isInt();

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'Failure',
                message: 'Order not found',
                data: errors,
            });
        }
        return next();
    }

    /**
     * @description checks an order status
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */

    static checkOrderStatus(req, res, next) {
        req.checkBody('orderStatus', 'Order status must not be empty').notEmpty();
        req.checkBody('orderStatus', 'Order status must be a string').isString();
        req.checkParams('orderId', 'Order id must not be empty').notEmpty();
        req.checkParams('orderId', 'Order id must be an integer').isInt();

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'Failure',
                message: 'Validation not sucessful',
                data: errors,
            });
        }
        return next();
    }

    /**
     * validates order input fields
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */
    static checkOrderBody(req, res, next) {
        req.checkBody('foodName', 'food name must not be empty').notEmpty();
        req.checkBody('foodName', 'food name must be a string').isString();
        req.checkBody('foodPrice', 'food price must not be empty').notEmpty();
        req.checkBody('foodPrice', 'food price must be an integer').isInt();
        req.checkBody('qty', 'Quantity must not be empty').notEmpty();
        req.checkBody('qty', 'Quantity must be an integer').isInt();
        req.checkBody('orderStatus', 'Order status must not be empty').notEmpty();
        req.checkBody('orderStatus', 'Order status must be a string').isString();
        req.checkBody('deliveryAddress', 'Delivery address must not be empty').notEmpty();
        req.checkBody('deliveryAddress', 'Delivery address must be a string').isString();
        // req.checkBody('foodId', 'food id must not be empty').notEmpty().isInt();

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'failure',
                message: 'Order validation not successful',
                data: errors,
            });
        }
        return next();
    }
}
export default OrderValidator;