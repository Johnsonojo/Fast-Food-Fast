import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();

const hashedPassword = bcrypt.hashSync(process.env.MY_PASSWORD, 10);

const userSeed = `
INSERT INTO users(username,email,password,confirm_password,role)
VALUES ('Johnson','johnson@gmail.com','${hashedPassword}', '${hashedPassword}','admin');
INSERT INTO users(username,email,password,confirm_password,role)
VALUES ('Adesewa','adesewa@gmail.com','${hashedPassword}', '${hashedPassword}','user');
INSERT INTO users(username,email,password,confirm_password,role)
VALUES ('Oluchi','oluchi@gmail.com','${hashedPassword}', '${hashedPassword}','user');
INSERT INTO users(username,email,password,confirm_password,role)
VALUES ('Lovetta','lovetta@gmail.com','${hashedPassword}', '${hashedPassword}','user');`;

export default userSeed;