const { Pool } = require('pg');

/**
 * Conexão local - via pool de conexões
 */
const pool = new Pool({
    user: 'uifmsdw',
    host: 'localhost',
    database: 'bdifmsdw',
    password: 'uifmsdw',
    port: 5432
})

/**
 * Conexão heroku - via pool de conexões
 */
/* const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}) */

module.exports = pool;