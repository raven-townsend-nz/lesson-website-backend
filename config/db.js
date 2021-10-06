const mysql = require('mysql2/promise');
const fs = require("fs");

let pool = null;

exports.createPool = async function () {
    pool = mysql.createPool({
        multipleStatements: true,
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASS,
        database: process.env.MARIADB_DATABASE,
        port: process.env.MARIADB_PORT || 3306,
        ssl: {
            ca: Buffer.from(process.env.SSL_CA, "base64").toString("utf-8"),
            key: Buffer.from(process.env.SSL_KEY, "base64").toString("utf-8"),
            cert: Buffer.from(process.env.SSL_CERT, "base64").toString("utf-8")
        }
    });
};

exports.getPool = function () {
    return pool;
};
