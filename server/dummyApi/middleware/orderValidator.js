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
     * validates order input fields
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */
    static checkOrderBody(req, res, next) {
        req.checkBody('foodName', 'food name must not be empty').notEmpty().isString();
        req.checkBody('foodPrice', 'food price must not be empty').notEmpty().isInt();
        req.checkBody('qty', 'Quantity must be an integer').notEmpty().isInt();
        req.checkBody('orderStatus', 'You must enter a status for your order').notEmpty().isString();
        req.checkBody('deliveryAddress', 'You must enter a delivery address for your order').notEmpty().isString();
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

    /**
     * validates food items input fields
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {object}
     */
    static checkfoodBody(req, res, next) {
        req.checkBody('foodId', 'food id must not be empty').notEmpty().isInt();
        req.checkBody('foodName', 'food name must not be empty').notEmpty().isString();
        req.checkBody('foodPrice', 'food price must not be empty').notEmpty().isInt();
        req.checkBody('qty', 'Quanty must be an integer').notEmpty().isInt();

        const errors = req.validationErrors();

        if (errors) {
            return res.status(404).json({
                status: 'failure',
                message: 'Food items validation not successful',
                data: errors,
            });
        }
        return next();
    }
}
export default OrderValidator;