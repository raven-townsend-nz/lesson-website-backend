const users = require('../controllers/users.controller');
const authenticate = require('../middleware/authenticate');


module.exports = function (app) {

    app.route("/users")
        .get(authenticate.adminRequired, users.getAll);

    app.route("/users/loginCheck")
        .get(authenticate.loginRequired, users.loginCheck);

    app.route('/users/register')
        .post(users.registerUser);

    app.route("/users/login")
        .post(users.login);

    app.route("/users/logout")
        .post(users.logout);

    app.route('/users/:id')
        .patch(authenticate.loginRequired, users.edit)
        .get(authenticate.loginRequired, users.getUser)
        .delete(authenticate.loginRequired, users.delete)
}