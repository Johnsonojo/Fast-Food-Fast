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
                if (!result) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'Menus not found',
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: 'All menu fetched',
                    data: result.rows,
                });
            });
    }

    /**
     * @description post a menu
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    static postOneMenu(req, res) {
        const { foodName, foodPrice, foodImage } = req.body;

        db.query('SELECT * FROM menu where foodName = $1', [foodName])
            .then((result) => {
                if (result.rowCount !== 0) {
                    return res.status(409).json({
                        status: 'failure',
                        message: 'Menu already exist',
                    });
                }

                return db.query('INSERT INTO menu(foodName, foodPrice, foodImage)'
                    + ' values($1, $2, $3) RETURNING *', [foodName, foodPrice, foodImage])
                    .then(result => res.status(201).json({
                        status: 'Success',
                        message: 'Menu created successfully',
                        data: result.rows
                    }))
                    .catch((error) => {
                        res.status(500).json({
                            status: 'Failure',
                            message: 'Internal server error',
                            error
                        });
                    });
            });
    }

    /**
    * @description deletes a menu
    * @param {object} req
    * @param {object} res
    * @returns {object} object
    */
    static deleteOneMenu(req, res) {
        const { menuId } = req.params;
        db.query('SELECT * FROM menu WHERE id = $1', [menuId])
            .then((result) => {
                if (result.rowCount !== 0) {
                    db.query('DELETE FROM menu where id = $1', [menuId])
                        .then((deleteResult) => {
                            if (deleteResult.rowCount === 1) {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: `Menu ${menuId} deleted successfully`
                                });
                            }
                        })
                        .catch(error => res.status(500).send({
                            status: 'Failure',
                            mesage: 'Internal server error',
                        }));
                } else {
                    return res.status(404).json({
                        status: 'Failure',
                        message: 'Menu not found'
                    });
                }
            });
    }
}

export default MenuController;