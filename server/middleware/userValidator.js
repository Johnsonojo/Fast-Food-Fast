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
        req.checkBody('username', 'Username must not be empty').notEmpty();
        req.checkBody('username', 'Username must be a string').isString();
        req.checkBody('email', 'Email must not be empty').notEmpty();
        req.checkBody('email', 'Email address must be a string').isEmail();
        req.checkBody('password', 'Password must not be empty').notEmpty();
        req.checkBody('password', 'Password must be at least 6 chars long')
            .isLength({ min: 6 });
        req.checkBody('password', 'Password must contain a number').matches(/\d/);

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
        req.checkBody('email', 'Email must not be empty').notEmpty();
        req.checkBody('email', 'Email address must be a string').isEmail();
        req.checkBody('password', 'Password must not be empty').notEmpty();
        req.checkBody('password', 'Password must be at least 6 chars long')
            .isLength({ min: 6 });
        req.checkBody('password', 'Password must contain a number').matches(/\d/);

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