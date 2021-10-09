const resources = require('../controllers/resources.controller');
const authenticate = require('../middleware/authenticate');


module.exports = function (app) {

    app.route('/resources/:name')
        .get(authenticate.loginRequired, resources.getByName)
        .patch(authenticate.adminRequired, resources.setByName);
}