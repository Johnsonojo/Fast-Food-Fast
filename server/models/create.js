import db from './dbConnect';

const userQuery = `
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_status;
CREATE TYPE user_status AS ENUM('user','admin');
CREATE TABLE users(id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_status DEFAULT 'user',
  phone VARCHAR(50),
  address TEXT,
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now());`;

const orderQuery = `
DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE IF EXISTS order_status;
CREATE TYPE order_status AS ENUM('New','Processing','Cancelled','Complete');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  foodname VARCHAR(50) NOT NULL,
  foodprice INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  totalamount INTEGER NOT NULL,
  orderstatus order_status DEFAULT 'New',
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now(),
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id));`;

const menuQuery = `
DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu(
  id SERIAL PRIMARY KEY,
  foodName VARCHAR(50) NOT NULL,
  foodPrice VARCHAR(50) NOT NULL,
  foodImage VARCHAR(100) NOT NULL,
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now());`;

const foodItemsQuery = `
  DROP TABLE IF EXISTS cart CASCADE;
  CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    foodname VARCHAR(50) NOT NULL,
    foodprice VARCHAR(50) NOT NULL,
    qty INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id));`;


db.query(userQuery).then((response) => {
    if (response) {
        console.log('Successfully created users table');
    } else {
        console.log('Error while creating users table');
    }
    db.query(orderQuery).then((response) => {
        if (response) {
            console.log('Successfully created orders table');
        } else {
            console.log('Error while creating orders table');
        }
        db.query(menuQuery).then((response) => {
            if (response) {
                console.log('Successfully created menu table');
            } else {
                console.log('Error while creating menu table');
            }
            db.query(foodItemsQuery).then((response) => {
                if (response) {
                    console.log('Successfully created cart table');
                } else {
                    console.log('Error while creating cart table');
                }
                db.end();
            });
        });
    });
});