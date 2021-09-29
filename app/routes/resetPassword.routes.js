const resetPassword = require('../controllers/resetPassword.controller');


module.exports = function (app) {

    app.route('/send-reset')

        /**
         * Sends reset password email
         * Example body:
         * {
         *     "email": "email@example.com"
         * }
         */
        .post(resetPassword.sendReset)

    app.route('/verify-reset-token')

        /**
         * Verifies a password reset token and makes sure it was sent in the last hour
         * Example body:
         * {
         *     "email": "name@email.com",
         *     "token": "slkdjfslj2345SDfjlksjkw3j4kj"
         * }
         */
        .post(resetPassword.verifyToken);

    app.route('/reset-password')

        /**
         * Resets a user's password based on authentication from password reset email
         * Example body:
         * {
         *     "email": "name@email.com",
         *     "token": "slkdjfslj2345SDfjlksjkw3j4kj",
         *     "password": "password123"
         * }
         */
        .patch(resetPassword.resetPassword);
}