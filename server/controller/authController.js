// import dotenv from 'dotenv';
import db from '../models/dbConnect';

// dotenv.config();

class UserController {
  static getAllUser(req, res) {
    db.query('SELECT * from users').then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 'failure',
          message: 'Users not found'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'All users found',
        data: result.rows
      });
    });
  }

  static getOneUser(req, res) {
    const { userId } = req.params;
    db.query('SELECT id, email, role FROM users WHERE id = $1', [userId]).then(
      (result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 'failure',
            message: 'user not found'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: `User ${userId} successfully found`,
          data: result.rows[0]
        });
      }
    );
  }
}

export default UserController;
