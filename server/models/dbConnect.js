import pg from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const nodeEnv = process.env.NODE_ENV;
let db;

if (nodeEnv === 'development') {
    db = config.development;
} else if (nodeEnv === 'test') {
    db = config.test;
} else { db = process.env.DATABASE_URL; }

console.log('Working...please wait');
console.log(nodeEnv);

const pool = new pg.Pool(db);

export default pool;