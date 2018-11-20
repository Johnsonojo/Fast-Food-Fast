import db from './dbConnect';

const dropUserTable = `
DROP TABLE IF EXISTS users cascade;
DROP TYPE IF EXISTS status;`;

const dropOrdersTable = `
DROP TABLE IF EXISTS orders cascade;
DROP TYPE IF EXISTS order_status;`;

const dropMenuTable = `
DROP TABLE IF EXISTS menu cascade`;

const dropCartTable = `
DROP TABLE IF EXISTS cart cascade`;

db.query(dropCartTable).then((response) => {
    if (response) {
        console.log('Successfully dropped and unseeded cart table');
    } else {
        console.log('Error dropping and unseeding cart table');
    }
    db.query(dropMenuTable).then((response) => {
        if (response) {
            console.log('Successfully dropped and unseeded menu table');
        } else {
            console.log('Error dropping and unseeding menu table');
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
});