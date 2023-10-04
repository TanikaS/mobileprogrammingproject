const mysql = require('mysql');

const dbConfig = {
  host: '35.228.84.185',
  user: 'root',
  password: 'heippa123',
  database: 'app',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
