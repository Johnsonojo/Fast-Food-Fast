import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET;

/**
 * @class AuthenticateUser
 */
class AuthenticateManager {
    /**
     * @description Authenticate user token
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     * @return {Object}
     */
    static authenticateUser(req, res, next) {
        try {
            const token = req.headers.authorization ||
                req.body.token || req.query.token || req.headers.token;

            if (!token || token === '') {
                return res.status(401).json({
                    status: 'failure',
                    message: 'User not authenticated. No token provided',
                });
            }
            const verifiedToken = jwt.verify(token, secret);
            req.token = verifiedToken;
            return next();
        } catch (error) {
            return res.status(401).json({
                status: 'failure',
                message: 'User authentication invalid',
            });
        }
    }

    /**
     *@description checks Admin role
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {Object}
     */
    static authenticateAdmin(req, res, next) {
        try {
            const token = req.headers.Authorization ||
                req.body.token || req.query.token || req.headers.token;

            const verifiedToken = jwt.verify(token, secret);
            req.token = verifiedToken;

            if (req.token.role !== 'admin') {
                return res.status(403).json({
                    status: 'failure',
                    message: 'User not authenticated to perform this action'
                });
            }
            return next();
        } catch (error) {
            return res.status(401).json({
                status: 'failure',
                message: 'User authentication invalid',
                error
            });
        }
    }
}


export default AuthenticateManager;