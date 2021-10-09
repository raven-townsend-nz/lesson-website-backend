const express = require('express');
const bodyParser = require('body-parser');
const { allowCrossOriginRequestsMiddleware } = require('../app/middleware/cors.middleware');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const functions = require("firebase-functions");
const cors = require('cors');


/*
Sets up Morgan, an http logger, for app
 */
const setupMorgan = function(app) {
    // create a rotating write stream
    // This creates a new log at an interval set in the .env
    // Once max files are hit, extra files are deleted
    const accessLogStream = rfs.createStream('httpAccess.log', {
        interval: functions.config().env.morgan_interval, // rotate daily
        path: '/tmp/logs',
        maxFiles: Number(functions.config().env.max_log_count)
    });

    // setup the logger
    // Sends a short formatted summary of http requests to the current log file
    app.use(morgan('short', { stream: accessLogStream }));
    // Outputs a short formatted summary directly to stdout
    app.use(morgan('short'));
}

/*
Makes app accept the following content types
 */
const setAcceptedContent = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'text/plain', limit: '500mb'}));  // for the /executeSql endpoint
    app.use(bodyParser.raw({ type: 'application/msword', limit: '500mb'}));
    app.use(bodyParser.raw({ type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', limit: '500mb'}));
    app.use(bodyParser.raw({ type: 'application/vnd.ms-powerpoint', limit: '500mb'}));
    app.use(bodyParser.raw({ type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', limit: '500mb'}));
    app.use(bodyParser.raw({ type: 'application/pdf', limit: '500mb'}));
}

/*
attaches all the routes to app
 */
const setRoutes = function (app) {
    require('../app/routes/admin.routes')(app);
    require('../app/routes/allocations.routes')(app);
    require('../app/routes/lessons.routes')(app);
    require('../app/routes/storage.routes')(app);
    require('../app/routes/users.routes')(app);
    require('../app/routes/allocations.routes')(app);
    require('../app/routes/resetPassword.routes')(app);
    require('../app/routes/resources.routes')(app);
}

module.exports = function () {
    // INITIALISE EXPRESS //
    const app = express();

    // MIDDLEWARE
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(cors({ origin: true }));

    setupMorgan(app);
    setAcceptedContent(app);
    setRoutes(app);

    return app;
};
