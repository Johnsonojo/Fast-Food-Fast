import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();

const hashedPassword = bcrypt.hashSync(process.env.MY_PASSWORD, 10);

const userSeed = `
INSERT INTO users(username,email,password,role)
VALUES ('Johnson','johnson@gmail.com','${hashedPassword}','admin');
INSERT INTO users(username,email,password,role)
VALUES ('Adesewa','adesewa@gmail.com','${hashedPassword}','user');
INSERT INTO users(username,email,password,role)
VALUES ('Oluchi','oluchi@gmail.com','${hashedPassword}','user');
INSERT INTO users(username,email,password,role)
VALUES ('Lovetta','lovetta@gmail.com','${hashedPassword}','user');`;

export default userSeed;