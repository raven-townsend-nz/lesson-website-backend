const admin = require('../models/admin.models');
const users = require('../models/users.models');
const {loggedOutRequired} = require("../middleware/authenticate");
const logger = require("../../config/logger");
const DGAA_EMAIL = process.env.DGAA_EMAIL;

exports.addAdmin = async function (req, res) {
    try {
        const userId = req.params.id;
        let user = users.getUserById(userId);
        if (user === null) {
            res.status(404).send("No user with that ID exists");
            return;
        }
        await admin.setAdmin(userId, true);
        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in addAdmin(), admin.controller, ${err}`);
        res.status(500).send();
    }
};

exports.removeAdmin = async function (req, res) {
    try {
        const currentUser = await users.getUserById(req.authenticatedUserId);
        if (currentUser.email !== DGAA_EMAIL) {
            res.status(403).send("Only the DGAA can remove users as admin");
            return;
        }
        const userId = req.params.id;
        let user = users.getUserById(userId);
        if (user === null) {
            res.status(404).send("No user with that ID exists");
            return;
        }
        await admin.setAdmin(userId, false);
        res.status(200).send("User's admin status revoked");
    } catch (err) {
        logger.getLogger().error(`Error in removeAdmin(), admin.controller, ${err}`);
        res.status(500).send();
    }
};
