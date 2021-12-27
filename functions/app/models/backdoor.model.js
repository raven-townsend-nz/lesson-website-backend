const db = require('../../config/db');
const fs = require('mz/fs');
const passwords = require('../middleware/passwords');
const imageDirectory = './storage/images/';
const defaultImageDirectory = './storage/default/';

exports.resetDb = async function () {
    let promises = [];

    const sql = await fs.readFile('app/resources/create_database.sql', 'utf8');
    promises.push(db.getPool().query(sql));  // sync call to recreate DB
    return Promise.all(promises);  // async wait for DB recreation and images to be deleted
};

exports.loadData = async function () {
    try {
        const sql = await fs.readFile('app/resources/resample_database.sql', 'utf8');
        await db.getPool().query(sql);
    } catch (err) {
        console.log(err.sql);
        throw err;
    }
};

exports.executeSql = async function (sql) {
    try {
        const [rows] = await db.getPool().query(sql);
        return rows;
    } catch (err) {
        console.log(err.sql);
        throw err;
    }
};
