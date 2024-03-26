const mysql = require("mysql2");
const path = require('path'); 
const dotenv = require('dotenv'); 
// require("dotenv").config(); 

dotenv.config({path: path.join(__dirname, './utils/.env')}); 

// Change information to fit the database 
const connection1 = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
}); 



    /*
const connection = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'DBUserCS418', 
    password:   '123', 
    database: 'webusers'
    */


console.log(process.env.DB_HOST)

// Exports the database 
module.exports = (
    connection1
    ); 

