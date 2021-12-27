const db = require('../../config/db');
const randtoken = require("rand-token");
const passwords = require("../middleware/passwords");


exports.generateToken = async function (email) {
    // Generate token, and save it in the database, and send it to client
    let token = randtoken.generate(32);
    const time = new Date();
    const insertTokenSql = 'UPDATE users SET reset_password_token = ?, reset_password_timestamp = ? WHERE email = ?;';
    await db.getPool().query(insertTokenSql, [token, time, email]);

    return token;
};


exports.getResetInfo = async function(email) {
    const getRestInfoSql = "SELECT first_name FROM users WHERE email = ?;";
    const [result] = await db.getPool().query(getRestInfoSql, [email]);
    if (result.length === 0) {
        return null;
    } else {
        return result[0];
    }
}


exports.resetPassword = async function(email, password) {
    const hash = await passwords.hash(password);
    const resetPasswordSql = "UPDATE users SET password = ?, reset_password_token = NULL, reset_password_timestamp = NULL WHERE email = ?;";
    await db.getPool().query(resetPasswordSql, [hash, email]);
}