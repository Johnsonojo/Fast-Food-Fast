import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from './dbConnect';

dotenv.config();

const hashedPassword = bcrypt.hashSync(process.env.JWT_SECRET, 10);
const userSeeding = `
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
  modified_date TIMESTAMP Default Now());
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Johnson','johnson@gmail.com','${hashedPassword}','admin','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Adesewa','adesewa@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Oluchi','oluchi@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Lovetta','lovetta@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');`;

const orderSeeding = `
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
  FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount)
VALUES (1, 'yamarita', 900, 3, 2700);
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (2, 'chicken and chips', 800, 2, 1600, 'accepted');
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (3, 'meat pie', 200, 4, 800,'declined');
INSERT INTO orders(
  user_id,
  foodname,
  foodprice,
  qty,
  totalamount,
  orderstatus)
VALUES (4, 'beef shawarma', 900, 2, 1800,'completed');`;

const foodSeeding = `
DROP TABLE IF EXISTS food CASCADE;
CREATE TABLE food(
  id SERIAL PRIMARY KEY,
  foodname VARCHAR(50) NOT NULL,
  foodprice VARCHAR(50) NOT NULL,
  created_date TIMESTAMP Default Now(),
  modified_date TIMESTAMP Default Now());
INSERT INTO food(foodname,foodprice)
VALUES ('yamarita', 900);
INSERT INTO food(foodname,foodprice)
VALUES ('meat pie', 300);
INSERT INTO food(foodname,foodprice)
VALUES ('beef shawarma', 800);
INSERT INTO food(foodname,foodprice)
VALUES ('jollof rice', 1200);`;

db.query(userSeeding).then((response) => {
    if (response) {
        console.log('Successfully created and seeded users table');
    } else {
        console.log('Error while creating and seeding users table');
    }
    db.query(orderSeeding).then((response) => {
        if (response) {
            console.log('Successfully created and seeded orders table');
        } else {
            console.log('Error while creating and seeding orders table');
        }
        db.query(foodSeeding).then((response) => {
            if (response) {
                console.log('Successfully created and seeded food table');
            } else {
                console.log('Error while creating and seeding food table');
            }
            db.end();
        });
    });
});

// const queries = `${userSeeding}${orderSeeding}${foodSeeding}`;

// export default queries;