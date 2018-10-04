/**
 * @class OrderValidator
 */
class OrderInputValidator {
    /**
     * @method validateOrderId
     * @static
     * @description This sanitizes auth data
     * @param {object} req request object
     * @param {object} res response object
     * @returns {Object} Object
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
}
export default OrderInputValidator;