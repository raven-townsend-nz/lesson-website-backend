const resetPasswordModel = require('../models/resetPassword.models');
const users = require('../models/users.models');
const axios = require('axios');
const logger = require("../../config/logger");
const emailJsUrl = "https://api.emailjs.com/api/v1.0/email/send";


const generateLink = function (email, token) {
    let link = process.env.FRONTEND_URL;
    link += '/reset-password';
    link += '?email=' + email;
    link += '&token=' + token;
    return link;
}


const sendReset = async function (req, res) {
    try {
        const token = await resetPasswordModel.generateToken(req.body.email);
        const resetInfo = await resetPasswordModel.getResetInfo(req.body.email);
        if (resetInfo === null) {
            res.status(404).send("Email not found");
            return;
        }
        const payload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_RESET_TEMPLATE,
            user_id: process.env.EMAILJS_USER_ID,
            accessToken: process.env.EMAILJS_TOKEN,
            template_params: {
                toName: resetInfo.first_name,
                toEmail: req.body.email,
                resetLink: generateLink(req.body.email, token),
            }
        }
        await axios.post(emailJsUrl, payload);

        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in sendReset(), resetPassword.controller, ${err}`);
        res.status(500).send(err);
    }
}


const verifyTokenNo200Response = async function(req, res) {
    try {
        let email = req.body.email;
        let token = req.body.token;
        let user = await users.getUserByEmail(email);
        if (user === null) {
            res.status(404).send("No user with that email");
            return;
        }

        let invalidTime = new Date(user.reset_password_timestamp);
        invalidTime.setHours(invalidTime.getHours() + 1);
        let currentTime = new Date();

        if (currentTime > invalidTime) {
            res.status(400).send("Your request to reset your password has expired");
            return;
        }

        if (user.reset_password_token !== token) {
            res.status(400).send("Invalid reset token");
            return;
        }
        return true;
    } catch (err) {
        logger.getLogger().error(`Error in verifyTokenNo200Response(), resetPassword.controller, ${err}`);
        res.status(500).send(err);
    }
}

const verifyToken = async function(req, res) {
    let verify = await verifyTokenNo200Response(req, res);
    if (!verify) {
        return;
    }
    res.status(200).send("Valid reset request");
}

const resetPassword = async function (req, res) {
    let verify = await verifyTokenNo200Response(req, res);
    if (!verify) {
        return;
    }
    let email = req.body.email;
    let password = req.body.password;
    try {
        await resetPasswordModel.resetPassword(email, password);
        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in resetPassword(), resetPassword.controller, ${err}`);
        res.status(500).send(err);
    }
}

module.exports = {
    sendReset,
    verifyToken,
    resetPassword
}