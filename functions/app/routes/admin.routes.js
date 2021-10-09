const admin = require('../controllers/admin.controller');
const authenticate = require('../middleware/authenticate');


module.exports = function (app) {

    app.route('/admin/:id')
        .post(authenticate.adminRequired, admin.addAdmin)
        .delete(authenticate.adminRequired, admin.removeAdmin)
}