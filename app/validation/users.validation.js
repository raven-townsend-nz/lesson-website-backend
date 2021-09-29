const validation = require('./common.validation');

exports.validateLogout = function (token) {
    if(!validation.isValidRequiredString(token)){
        return false;
    }
    return token.length === 32;
};


exports.validateRegister = function (user) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validation.isValidRequiredString(user.firstName)) {
        return false;
    } if (!validation.isValidRequiredString(user.lastName)) {
        return false;
    } if (!validation.isValidRequiredString(user.email)) {
        return false;
    } if (!validation.isValidRequiredString(user.password)) {
        return false;
    } if (user.password.length < 8) {
        return false;
    } if (!validation.isValidRequiredString(user.slackId)) {
        return false;
    } if (!emailRegex.test(String(user.email).toLowerCase())) {
        return false;
    }
    return true;
};


exports.validateLogin = function (user) {
    if (!validation.isValidRequiredString(user.email)) {
        return false;
    } else if (!validation.isValidEmail(user.email)) {
        return false;
    } else if (!validation.isValidRequiredString(user.password)) {
        return false;
    }
    return true;
};


exports.validateChangeUserRequest = function (requiredFields, optionalFields, email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (let requiredField of requiredFields) {
        if (!validation.isValidRequiredString(requiredField)) {
            return false;
        }
    }
    for (let optionalField of optionalFields) {
        if (!validation.isValidOptionalString(optionalField)) {
            return false;
        }
    }
    return !(email !== undefined && email != null && !emailRegex.test(email));

};