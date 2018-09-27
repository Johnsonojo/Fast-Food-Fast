import db from './dbConnect';

const dropUserTable = `
DROP TABLE IF EXISTS users cascade;
DROP TYPE IF EXISTS status;`;

const dropOrdersTable = `
DROP TABLE IF EXISTS orders cascade;
DROP TYPE IF EXISTS order_status;`;

const dropFoodTable = `
DROP TABLE IF EXISTS food cascade`;

db.query(dropFoodTable).then((response) => {
    if (response) {
        console.log('Successfully dropped and unseeded food table');
    } else {
        console.log('Error dropping and unseeding food table');
    }
    db.query(dropOrdersTable).then((response) => {
        if (response) {
            console.log('Successfully dropped and unseeded orders table');
        } else {
            console.log('Error dropping and unseeding orders table');
        }
        db.query(dropUserTable).then((response) => {
            if (response) {
                console.log('Successfully dropped and unseeded users table');
            } else {
                console.log('Error dropping and unseeding users table');
            }
            db.end();
        });
    });
});