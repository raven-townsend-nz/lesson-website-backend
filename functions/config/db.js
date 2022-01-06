const mysql = require('mysql2/promise');
const fs = require("fs");
const functions = require('firebase-functions');


let pool = null;

exports.createPool = async function () {
    pool = mysql.createPool({
        multipleStatements: true,
        host: functions.config().env.mariadb_host,
        user: functions.config().env.mariadb_user,
        password: functions.config().env.mariadb_pass,
        database: functions.config().env.mariadb_database,
        port: functions.config().env.mariadb_port || 3306,
        // ssl: {
        //     ca: Buffer.from(functions.config().env.ssl_ca, "base64").toString("utf-8"),
        //     key: Buffer.from(functions.config().env.ssl_key, "base64").toString("utf-8"),
        //     cert: Buffer.from(functions.config().env.ssl_cert, "base64").toString("utf-8")
        // }
    });
};

exports.getPool = function () {
    return pool;
};
