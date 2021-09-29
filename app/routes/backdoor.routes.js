const backdoor = require('../controllers/backdoor.controller');

module.exports = function (app) {
    app.route('/reset')
        .post(backdoor.resetDb);

    app.route('/resample')
        .post(backdoor.resample);

    app.route('/reload')
        .post(backdoor.reload);

    app.route('/executeSql')
        .post(backdoor.executeSql);
};
