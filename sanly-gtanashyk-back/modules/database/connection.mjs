import PG from 'pg';

const Pool = PG.Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'computer_faculty',
    password: 'QwertyWeb123',
    port: '5432',
});

export const db = pool;

