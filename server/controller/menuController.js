import db from '../models/dbConnect';

// dotenv.config();

class MenuController {
    /**
     * @description get a menu
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */

    static getAllMenu(req, res) {
        db.query('SELECT * from menu')
            .then((result) => {
                res.status(200).json({
                    status: 'success',
                    message: 'All menu fetched',
                    data: result.rows,
                });
            })
            .catch(error => res.status(500).json({
                status: 'error',
                mesage: 'internal server error',
                error
            }));
    }
}

export default MenuController;