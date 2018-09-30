import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import db from '../models/dbConnect';

dotenv.config();

class AuthController {
    /**
     * @description Creates a User
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */

    static signUp(req, res) {
        const username = req.body.username.trim();
        const email = req.body.email.trim();
        const paswordHash = bcrypt.hashSync(req.body.password.trim(), 10);

        const text = `
        INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *;`;
        const values = [username, email, paswordHash];

        db.query('SELECT * FROM users where email = $1', [email])
            .then((result) => {
                if (result.rowCount !== 0) {
                    return res.status(409).json({
                        status: 'failure',
                        message: 'User already exist',
                    });
                }
                return db.query(text, values)
                    .then((newUser) => {
                        // create token
                        const { id, email, role } = newUser.rows[0];
                        const payload = {
                            id,
                            role,
                            email
                        };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 }); //24 hours
                        // data to display after success
                        const data = {
                            id: newUser.rows[0].id,
                            username: newUser.rows[0].username,
                            email: newUser.rows[0].email,
                            token
                        };
                        return res.status(201).json({
                            status: 'success',
                            message: 'User created',
                            data,
                        });
                    })
                    .catch(error => res.status(500).json({
                        status: 'error',
                        mesage: 'internal server error',
                        error
                    }));
            })
            .catch(error => res.status(500).json({
                status: 'error',
                mesage: 'internal server error',
                error
            }));
    }
}

export default AuthController;