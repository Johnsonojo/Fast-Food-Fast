/**
 * @class authValidator
 */
class AuthInputValidator {
    /**
     * @method validateUserInputs
     * @static
     * @description This sanitizes auth data
     * @param {object} req request object
     * @param {object} res response object
     * @returns {Object} Object
     */
    static validateSignUpInput(req, res, next) {
        req.check('username')
            .notEmpty().withMessage('Username must not be empty')
            .isString()
            .withMessage('Username must be a string');

        req.check('email')
            .notEmpty().withMessage('Email must not be empty')
            .isEmail()
            .withMessage('Please provide an email address');

        req.check('password')
            .notEmpty().withMessage('Password must not be empty')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 chars long')
            .matches(/\d/)
            .withMessage('Password must contain a number');

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
     * @method signinValidator
     * @static
     * @description This validates user login
     * @param {object} req request object
     * @param {object} res response object
     * @returns {Object} Object
     */
    static validatorSignInInput(req, res, next) {
        req.check('email')
            .notEmpty().withMessage('Email must not be empty')
            .isEmail()
            .withMessage('Please provide an email address');

        req.check('password')
            .notEmpty().withMessage('Password must not be empty')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 chars long')
            .matches(/\d/)
            .withMessage('Password must contain a number');

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

export default AuthInputValidator;