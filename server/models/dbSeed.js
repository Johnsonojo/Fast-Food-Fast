import db from './dbConnect';
import userSeed from './users';
import orderSeed from './orders';
import menuSeed from './menu';
import cartSeed from './foodItems';

db.query(userSeed).then((response) => {
    if (response) {
        console.log('Successfully seeded users table');
    } else {
        console.log('Error while seeding users table');
    }
    db.query(orderSeed).then((response) => {
        if (response) {
            console.log('Successfully seeded orders table');
        } else {
            console.log('Error while seeding orders table');
        }
        db.query(menuSeed).then((response) => {
            if (response) {
                console.log('Successfully seeded menu table');
            } else {
                console.log('Error while seeding menu table');
            }
            db.query(cartSeed).then((response) => {
                if (response) {
                    console.log('Successfully seeded cart table');
                } else {
                    console.log('Error while seeding cart table');
                }
                db.end();
            });
        });
    });
});