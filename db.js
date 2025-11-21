const {Pool} = require ('pg');
require ('dotenv').config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    //beberapa layanan cloud mmeerlukan ssl
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),

};