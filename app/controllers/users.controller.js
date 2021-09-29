const users = require('../models/users.models');
const validation = require('../validation/users.validation');
const logger = require("../../config/logger");

exports.logout = async function (req, res) {
    try {
        const token = req.header('X-Authorization');
        if(!validation.validateLogout(token)){
            res.status(400).send("X-Authorization token not valid");
        }

        const success = await users.logout(token);
        if(!success){
            res.status(401).send("X-Authorization token not found");
        } else {
            res.status(200).send();
        }
    } catch (err) {
        logger.getLogger().error(`Error in logout(), users.controller, ${err}`);
        res.status(500).send();
    }
};


exports.getAll = async function (req, res) {
    try {
        const allUsers = await users.allUsers();
        const response = [];
        for (let user of allUsers) {
            let responseUser = {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                slackId: user.slack_id,
                isAdmin: user.is_admin
            }
            response.push(responseUser);
        }
        res.status(200).send(response);
    } catch (err) {
        logger.getLogger().error(`Error in getAll(), users.controller, ${err}`);
        res.status(500).send();
    }
}

async function validEmailAndSlackId(req, res) {
    let user = await users.getUserByEmail(req.body.email);
    if (user !== null && user.id.toString() !== req.params.id) {
        res.status(409).send('Account with that email already exists');
        return false;
    }
    user = await users.getUserBySlackId(req.body.slackId);
    if (user !== null && user.id.toString() !== req.params.id) {
        res.status(409).send('Account with that slack ID already exists');
        return false;
    }
    return true;
}

exports.registerUser = async function (req, res) {
    try {
        const valid = validation.validateRegister(req.body);
        if (!valid) {
            res.status(400).send('One or more of the fields do not follow the correct format');
        } else {
            if (! await validEmailAndSlackId(req, res)) {return;}
            const userId = await users.registerUser(req.body);
            res.status(201).send({"userId": userId}) // user should be a JSON object with just 'userId' field.

        }
    } catch (err) {
        logger.getLogger().error(`Error in registerUser(), users.controller, ${err}`);
        res.status(500).send();
    }
};


exports.login = async function (req, res) {
    try {
        const valid = validation.validateLogin(req.body); //True if request body is valid
        if (!valid) {
            res.status(400).send('Email or password do not follow the correct format');
            return undefined;
        }
        const email = req.body.email;
        const password = req.body.password;

        const user = await users.getUserByEmail(email);
        if (user === null) {
            res.status(400).send('Email not registered');
            return undefined;
        }

        const valid_login = await users.checkEmailAndPassword(user, password);
        if (!valid_login) {
            res.status(400).send('Invalid email or password');
            return undefined;
        }

        const token = await users.generateToken(user.id);
        json = {
            "userId": user.id,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "isAdmin": !!user.is_admin,
            "email": user.email,
            "slackId": user.slack_id,
            "token": token
        }
        res.status(200).send( json );
    } catch (err) {
        logger.getLogger().error(`Error in login(), users.controller, ${err}`);
        res.status(500).send();
    }
};

exports.loginCheck = async function (req, res) {
    try {
        // If we get here, then login has already been authenticated via middleware
        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in loginCheck(), users.controller, ${err}`);
        res.status(500).send();
    }
};


exports.getUser = async function (req, res) {
    try {
        const userId = req.params.id;
        const user = await users.getUserById(userId);

        if (user === null) {
            res.status(404).send();
            return;
        }
        const req_token = req.header('X-Authorization');
        const firstName = user.first_name;
        const lastName = user.last_name;
        const isAdmin = user.is_admin;
        const email = user.email;
        const slackId = user.slack_id;
        let json;

        // send email as well if request token matches the token of the user received from the database or they are an admin
        if (user.auth_token === req_token || req.isAdmin) {
            json = {
                "firstName": firstName,
                "lastName": lastName,
                "isAdmin": isAdmin,
                "email": email,
                "slackId": slackId
               }
            res.status(200).send(json);

            // otherwise just send first and last name
        } else {
            json = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "isAdmin": isAdmin
                   }
            res.status(200).send(json);
        }
    } catch (err) {
        logger.getLogger().error(`Error in getUser(), users.controller, ${err}`);
        res.status(500).send();
    }
};


exports.edit = async function (req, res) {
    try {
        const userId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let currentPassword = req.body.currentPassword;
        let slackId = req.body.slackId;

        if (!req.isAdmin && req.authenticatedUserId !== userId) {
            res.status(403).send("You can only edit your own details, unless you are an admin");
            return;
        }

        // check all fields are syntactically valid
        let valid = validation.validateChangeUserRequest([firstName, lastName, email, slackId],
            [password, currentPassword], email);

        const user = await users.getUserById(userId);
        if (user === null) {
            res.status(404).send("No user with that ID exists");
            return;
        }
        if (user.email === process.env.DGAA_EMAIL) {
            res.status(403).send("Cannot update DGAA details");
            return;
        }

        // check that the current password is correct (if required)
        const needsCurrentPassword = (password !== undefined);
        let correctCurrentPassword = false;
        if (needsCurrentPassword && currentPassword === undefined) {
            correctCurrentPassword = false;
        } else if (needsCurrentPassword) {
            correctCurrentPassword = await users.checkIdAndPassword(userId, currentPassword);
        }

        if (!correctCurrentPassword && needsCurrentPassword) {
            res.status(400).send('Incorrect current password');
            return;
        }

        if (!valid) {
            res.status(400).send('One of the fields is incorrect or missing');
            return;
        }

        if (await validEmailAndSlackId(req, res)) {
            if (needsCurrentPassword) {
                await users.updateUserWithPassword(userId, firstName, lastName, email, password, slackId);
                res.status(200).send();
            } else {
                await users.updateUser(userId, firstName, lastName, email, slackId);
                res.status(200).send();
            }
        }
    } catch (err) {
        logger.getLogger().error(`Error in edit(), users.controller, ${err}`);
        res.status(500).send();
    }
};


exports.delete = async function (req, res) {
    try {
        const userId = req.params.id;

        if (!req.isAdmin && req.authenticatedUserId !== userId) {
            res.status(403).send("You can only delete your own account, unless you are an admin");
            return;
        }

        const user = await users.getUserById(userId);
        if (user === null) {
            res.status(404).send("No user with that ID exists");
            return;
        }
        await users.deleteUser(userId);
        res.status(200).send(`User ${userId} deleted`);
    } catch (err) {
        logger.getLogger().error(`Error in delete(), users.controller, ${err}`);
        res.status(500).send();
    }
};


