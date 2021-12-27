exports.isValidRequiredString = function (string) {
    if (string === undefined || string === null) {
        return false;
    } else if (typeof(string) !== 'string') {
        return false;
    } else if (string.length < 1) {
        return false;
    }
    return true;
}

exports.isValidEmail = function (string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(string).toLowerCase());
}


exports.isValidOptionalString = function (string) {
    if (string === undefined) {
        return true;
    } else if (string === null) {
        return false;
    } else if (typeof(string) !== 'string') {
        return false;
    }
    return true;
}


exports.isNullableString = function (string) {
    if (string === undefined || string === null) {
        return true;
    } else if (typeof(string) !== 'string') {
        return false;
    } else if (string.length < 1) {
        return false;
    }
    return true;
}


exports.isArrayOfIntegers = function (array) {
    if (array === undefined || array === null) {
        return false;
    } else if (!Array.isArray(array)) {
        return false;
    } else if (array.length < 1) {
        return false;
    } else if (!array.every(function(element) {return typeof(element) === 'number';})) {
        return false;
    }
    return true;
}

exports.isValidRequiredInt = function (num) {
    if (num === undefined || num === null) {
        return false;
    } else if (typeof(num) !== 'number') {
        return false;
    } else if (num < 0) {
        return false;
    } else if (!Number.isInteger(num)) {
        return false;
    }
    return true;
}

exports.isPositiveInteger = function (num) {
    if (typeof(num) !== 'number') {
        return false;
    } else if (num < 1) {
        return false;
    } else if (!Number.isInteger(num)) {
        return false;
    }
    return true;
}

exports.isValidRequiredBool = function (bool) {
    if (bool === undefined || bool === null) {
        return false;
    } else if (typeof(bool) !== 'boolean') {
        return false;
    }
    return true;
}

exports.isValidRequiredDate = function (date) {
    if (!(date instanceof Date)){
        return false;
    }
    const today = new Date();
    today.setDate(today.getDate() - 1);
    if (date < today) {
        return false;
    }
    return true;
}