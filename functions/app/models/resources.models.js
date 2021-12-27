const db = require('../../config/db');


/**
 * Gets the value of the resource with a given name (name is unique in the resources table)
 * @param name
 * @returns Promise<null|*>
 */
exports.getByName = async function (name) {
    const getResourceSql = "SELECT value FROM resources WHERE name = ?;";
    const [results] = await db.getPool().query(getResourceSql, [name]);
    if (results) {
        return results[0];
    } else {
        return null;
    }

}

exports.setByName = async function (name, value) {
    const setResourceSql = "UPDATE resources SET value = ? WHERE name = ?;";
    const [result] = await db.getPool().query(setResourceSql, [value, name]);
    return result.affectedRows > 0;
}