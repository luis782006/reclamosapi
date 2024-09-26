import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

export const pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    database: 'reclamos',
    user: 'luis',
    password: 'Luisfelipe782006'
});