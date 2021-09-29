const db = require('../../config/db');
const passwords = require('../middleware/passwords');
const DGAA_EMAIL = process.env.DGAA_EMAIL;
const DGAA_PASS = process.env.DGAA_PASS;

exports.createDGAA = async function() {
    const createDGAASql = "INSERT INTO `users` (`email`, `first_name`, `last_name`, `password`, `slack_id`, `auth_token`, `is_admin`) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?);";
    const email = DGAA_EMAIL;
    const firstName = 'Admin';
    const lastName = 'Account';
    const password = await passwords.hash(DGAA_PASS);
    const slackId = 'U024M3S4R9S';
    const token = null;
    const isAdmin = true;
    await db.getPool().query(createDGAASql, [email, firstName, lastName, password, slackId, token, isAdmin]);
}

exports.setDgaaAsAdmin = async function() {
    const setAdminSql = "UPDATE users SET is_admin = 1 WHERE email = ?;";
    await db.getPool().query(setAdminSql, [DGAA_EMAIL]);
}

exports.checkDGAAExists = async function () {
  const checkSQL = "SELECT * FROM users where email = ?;";
  const sqlResponse = (await db.getPool().query(checkSQL, [DGAA_EMAIL]))[0];
  return sqlResponse.length > 0;
};

exports.checkDGAAExistsAndIsAdmin = async function () {
  const checkSQL = "SELECT * FROM users where email = ? AND is_admin = 1;";
  const sqlResponse = (await db.getPool().query(checkSQL, [DGAA_EMAIL]))[0];
    return sqlResponse.length > 0;
};

exports.setAdmin = async function (userId, isAdmin) {
    const addAdminSql = "UPDATE users SET is_admin = ? WHERE id = ?;";
    await db.getPool().query(addAdminSql, [isAdmin, userId]);
};