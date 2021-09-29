const log4js = require("log4js");
const path = require("path");

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
                fileAppender: { type: 'dateFile', filename: path.join(__dirname, 'logs/serverLog.log'),
                    flags: 'a', pattern: process.env.LOGGER_INTERVAL_PATTERN, daysToKeep: process.env.MAX_LOG_COUNT },
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
