import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();

const hashedPassword = bcrypt.hashSync(process.env.MY_PASSWORD, 10);

const userSeed = `
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Johnson','johnson@gmail.com','${hashedPassword}','admin','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Adesewa','adesewa@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Oluchi','oluchi@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');
INSERT INTO users(username,email,password,role,phone,address)
VALUES ('Lovetta','lovetta@gmail.com','${hashedPassword}','user','2348188699277','234 Ikorodu road Anthony');`;

export default userSeed;