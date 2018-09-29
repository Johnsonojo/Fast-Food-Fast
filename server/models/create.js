import db from './dbConnect';

const userQuery = `
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM('user','admin');
CREATE TABLE users(id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role status DEFAULT 'user',
  phone VARCHAR(50),
  address TEXT,
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now());`;

const orderQuery = `
DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE IF EXISTS order_status;
CREATE TYPE order_status AS ENUM('pending','accepted','declined','completed');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  foodname VARCHAR(50) NOT NULL,
  foodprice INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  totalamount INTEGER NOT NULL,
  orderstatus order_status DEFAULT 'pending',
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now(),
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id));`;

const menuQuery = `
DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu(
  id SERIAL PRIMARY KEY,
  foodname VARCHAR(50) NOT NULL,
  foodprice VARCHAR(50) NOT NULL,
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now());`;

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
                console.log('Successfully created food table');
            } else {
                console.log('Error while creating food table');
            }
            db.end();
        });
    });
});