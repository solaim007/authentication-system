const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const db = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
})
module.exports = db;