const mysql = require('mysql2/promise');

let pool = null;

exports.createPool = async function () {
    pool = mysql.createPool({
        multipleStatements: true,
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASS,
        database: process.env.MARIADB_DATABASE,
        port: process.env.MARIADB_PORT || 3306
    });
};

exports.getPool = function () {
    return pool;
};
