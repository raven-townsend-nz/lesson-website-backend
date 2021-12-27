const log4js = require("log4js");
const path = require("path");
const functions = require("firebase-functions");

/*
Logger singleton so that only one logger is active at once.
Available calls are:
 - trace
 - debug
 - info
 - warn
 - error
 - fatal

 To use the logger from anywhere, use:
 logger.getLogger().call("message");
 EG
 logger.getLogger().info("Message");

 This logger will copy the input message to a log file and to the console.
 */

let logger = null;

exports.getLogger = function() {
    if (logger == null) {

        log4js.configure({
            appenders: {
                fileAppender: { type: 'dateFile', filename: '/tmp/serverLog.log',
                    flags: 'a', pattern: functions.config().env.logger_interval_pattern, daysToKeep: functions.config().env.max_log_count },
                console: { type: 'console' }
            },
            categories: {
                default: { appenders: ['fileAppender', 'console'], level: 'all' }
            }
        })

        logger = log4js.getLogger();
    }
    return logger;
}
