import pgPromise from 'pg-promise';

const pgp = pgPromise();
const connection =  process.env.DATABASE_URL || {
    host: 'localhost',
    port: 5432, // Puerto predeterminado para PostgreSQL
    user: 'postgres',
    password: 'uriloco989',
    database: 'ng_onlineShop'
};

const db = pgp(connection);

export default db;
