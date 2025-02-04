const { Pool } = require("pg");
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD, 
    host: "localhost",
    port: 5432,
    database: process.env.POSTGRES_DATABASE
});

module.exports = pool
