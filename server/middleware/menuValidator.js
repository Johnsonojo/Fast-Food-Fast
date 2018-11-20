/**
 * @class menuValidator
 */
class MenuValidator {
    /**
     * @method validateMenuInputs
     * @static
     * @description This sanitizes auth data
     * @param {object} req request object
     * @param {object} res response object
     * @returns {Object} Object
     */
    static validateMenuInput(req, res, next) {
        req.checkBody('foodName', 'Food name must not be empty').notEmpty();
        req.checkBody('foodName', 'Food name must be a string').isString();
        req.checkBody('foodPrice', 'Food price must not be empty').notEmpty();
        req.checkBody('foodPrice', 'Food price must not be a number').isInt();
        req.checkBody('foodImage', 'Food image must not be empty').notEmpty();
        req.checkBody('foodImage', 'Food image must not be a string').isString();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                status: 'failure',
                message: 'Menu validation not successful',
                data: errors
            });
        }
        return next();
    }

    /**
   * @method validateMenuId
   * @static
   * @description This sanitizes auth data
   * @param {object} req request object
   * @param {object} res response object
   * @returns {Object} Object
   */
    static validateMenuId(req, res, next) {
        req.checkParams('menuId', 'menu id must not be empty').notEmpty();
        req.checkParams('menuId', 'menu id must be a number').isInt();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                status: 'failure',
                message: 'Menu validation not successful',
                data: errors
            });
        }
        return next();
    }
}

export default MenuValidator;