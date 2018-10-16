/**
 * @class OrderValidator
 */
class OrderInputValidator {
    /**
     * @description Validates order inputs
     * @param {object} req 
     * @param {object} res 
     * @returns {Object} 
     */
    static validateOrderId(req, res, next) {
        req.check('orderId', 'Order Id must not be empty').notEmpty();
        req.check('orderId', 'Order Id must be an integer').isInt();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                status: 'failure',
                message: 'Validation not successful',
                data: errors
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
    static validateOrderBody(req, res, next) {
        req.checkBody('foodName', 'food name must not be empty').notEmpty();
        req.checkBody('foodName', 'food name must be a string').isString();
        req.checkBody('foodPrice', 'food price must not be empty').notEmpty();
        req.checkBody('foodPrice', 'food price must be an integer').isInt();
        req.checkBody('qty', 'Quantity must not be empty').notEmpty();
        req.checkBody('qty', 'Quantity must be an integer').isInt();
        req.checkBody('address', 'Delivery address must not be empty').notEmpty();
        req.checkBody('address', 'Delivery address must be a string').isString();

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

    /**
     * @description checks an order status
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */

    static validateOrderStatus(req, res, next) {
        req.checkBody('orderStatus', 'Order status must not be empty').notEmpty();
        req.checkBody('orderStatus', 'Order status must be a string').isString();
        req.checkParams('orderId', 'Order id must not be empty').notEmpty();
        req.checkParams('orderId', 'Order id must be an integer').isInt();
        req.checkBody('orderStatus', 'Order status is either New, Processing, Cancelled or Complete')
            .isIn(['New', 'Processing', 'Cancelled', 'Complete']);

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'failure',
                message: 'Validation not successful',
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

    static validateOrderHistory(req, res, next) {
        req.checkParams('userId', 'User id must not be empty').notEmpty();
        req.checkParams('userId', 'User id must be an integer').isInt();

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'failure',
                message: 'Validation not successful',
                data: errors,
            });
        }
        return next();
    }
}
export default OrderInputValidator;