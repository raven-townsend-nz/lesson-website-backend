const db = require('../../config/db');
const randtoken = require('rand-token');
const passwords = require('../middleware/passwords');
const DGAA_EMAIL = process.env.DGAA_EMAIL;

/**
 * Checks if the given string is all lower case, and if so capitalises the first letter. Otherwise leaves as is (don't
 * want to mess with names like 'Taylor-Smith')
 * @param {string} string
 * @return {string}
 */
function capitaliseName(string) {
    let lowerCase = string.toLowerCase();
    if (lowerCase === string) {
        string = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    }
    return string;
}

exports.allUsers = async function () {
    const sql = "SELECT * FROM users WHERE email != ? ORDER BY last_name, first_name;";
    const users = (await db.getPool().query(sql, [DGAA_EMAIL]))[0];
    return users;
};

exports.registerUser = async function (user) {
    const firstName = capitaliseName(user.firstName);
    const lastName = capitaliseName(user.lastName);
    const email = user.email.toLowerCase();
    const hash = await passwords.hash(user.password);
    const slackId = user.slackId.toUpperCase();

    const insert_user = 'INSERT INTO users (first_name, last_name, email, password, slack_id) VALUES (?, ?, ?, ?, ?);';
    const [result] = await db.getPool().query(insert_user, [firstName, lastName, email, hash, slackId]);
    return result.insertId;
};


exports.checkEmailAndPassword = async function (user, password) {
    // Check correct password has been used
    return await passwords.compare(password, user.password);
};

exports.generateToken = async function (userId) {
    // Generate token, and save it in the database, and send it to client
    let tokenInUse = true;
    let usersWithToken;
    let token;
    const tokenSql = 'SELECT * FROM users WHERE auth_token = ?;'
    while (tokenInUse) {
        token = randtoken.generate(32);
        [usersWithToken] = await db.getPool().query(tokenSql, [token]);
        if (usersWithToken.length < 1) { tokenInUse = false; }
    }

    const insertTokenSql = 'UPDATE users SET auth_token = ? WHERE id = ?;';
    await db.getPool().query(insertTokenSql, [token, userId]);

    return token;
};

exports.logout = async function (token) {
    const checkSql = "SELECT * FROM users WHERE auth_token = ?;"
    const sqlResponse = await db.getPool().query(checkSql, [token]);

    if (sqlResponse[0].length < 1) {
        return false;
    } else {
        const logoutSql = 'UPDATE users SET auth_token = NULL WHERE auth_token = ?;';
        await db.getPool().query(logoutSql, [token]);
        return true;
    }
}

exports.getUserById = async function (userId) {
    const sql = 'SELECT * FROM users WHERE id = ?;';
    const users = await db.getPool().query(sql, [userId]);
    if (users[0].length < 1) {
        return null;
    } else {
        return users[0][0];
    }
};


exports.getUserByToken = async function (token) {
    const sql = 'SELECT * FROM users WHERE auth_token = ?;';
    const users = await db.getPool().query(sql, [token]);
    if (users[0].length < 1) {
        return null;
    } else {
        return users[0][0];
    }
};

exports.getUserByEmail = async function (email) {
    const sql = 'SELECT * FROM users WHERE email = ?;';
    const sqlResponse = (await db.getPool().query(sql, [email]))[0];
    let user;
    if (sqlResponse.length < 1) {
        return null;
    } else {
        user = sqlResponse[0];
        return user;
    }
};

exports.getUserBySlackId = async function (slackId) {
    const sql = 'SELECT * FROM users WHERE slack_id = ?;';
    const users = (await db.getPool().query(sql, [slackId]))[0];
    if (users.length < 1) {
        return null;
    } else {
        return users[0];
    }
};

exports.updateUser = async function (userId, firstName, lastName, email, slackId) {
    email = email.toLowerCase();
    firstName = capitaliseName(firstName);
    lastName = capitaliseName(lastName);
    slackId = slackId.toUpperCase();
    const updateUserSql = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, slack_id = ? WHERE id = ?;';
    await db.getPool().query(updateUserSql, [firstName, lastName, email, slackId, userId]);
};


exports.updateUserWithPassword = async function (userId, firstName, lastName, email, password, slackId) {
    const hash = await passwords.hash(password);
    email = email.toLowerCase();
    firstName = capitaliseName(firstName);
    lastName = capitaliseName(lastName);
    slackId = slackId.toUpperCase();
    const updateUserSql = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, slack_id = ? WHERE id = ?;';
    await db.getPool().query(updateUserSql, [firstName, lastName, email, hash, slackId, userId]);
}


exports.deleteUser = async function (userId) {
    const deleteUserSql = 'DELETE FROM users WHERE id = ?;';
    await db.getPool().query(deleteUserSql, [userId]);
}


exports.checkIdAndPassword = async function (userId, password) {
    // Check correct password has been used
    const user = await exports.getUserById(userId);
    return await passwords.compare(password, user.password);
};

