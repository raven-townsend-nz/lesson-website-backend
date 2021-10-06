require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');
const admin = require('./app/models/admin.models');
const slackApi = require("./slack/slackApi");
const logger = require("./config/logger");
const allocations = require('./app/models/allocations.models');


const app = express();
const port = process.env.PORT || 4941;


// Test connection to MySQL on start-up
async function testDbConnection() {
    logger.getLogger().info("Connecting to database...");
    try {
        await db.createPool();
        await db.getPool().getConnection();
        logger.getLogger().info("Connection successful.");
    } catch (err) {
        logger.getLogger().fatal(`Unable to connect to MySQL: ${err.message}`);
        process.exit(1);
    }
}


testDbConnection()
    .then(function () {
        app.listen(port, function () {
            logger.getLogger().info(`Listening on port: ${port}`);
        });
    });


/**
 * Checks if DGAA exists and is an Admin.
 * If not, this function will fix the DGAA.
 */
async function assertDGAAExists() {
    logger.getLogger().info("Checking DGAA exists...");
    try{
        let dgaaExists = await admin.checkDGAAExists();
        if (!dgaaExists) {
            logger.getLogger().info("DGAA not found, creating DGAA...");
            try{
                await admin.createDGAA();
                logger.getLogger().info("DGAA created.")
            } catch (err) {
                logger.getLogger().error(`DGAA CREATION FAILED!!! ${err}`);
            }
        } else {
            logger.getLogger().info("DGAA Exists.");
        }
        let dgaaIsAdmin = await admin.checkDGAAExistsAndIsAdmin()
        if (!dgaaIsAdmin) {
            logger.getLogger().info("DGAA not admin, setting DGAA to admin...");
            try{
                await admin.setDgaaAsAdmin();
                logger.getLogger().info("DGAA set to admin.");
            } catch (err) {
                logger.getLogger().error(`FAILED TO SET DGAA TO ADMIN!!! ${err}`);
            }
        }

        // delete any old allocations:
        await allocations.clearLastYearsAllocations()
    } catch (err) {
        logger.getLogger().error(`DGAA ASSERTION FAILED FOR UNKNOWN REASONS!!! ${err}`);
    }

}


/**
 * Checks if there are any lesson allocations which are late and do not have a lesson plan.
 * If there are, this function sends notifications to those instructors.
 */
async function checkForLateReminders() {
    logger.getLogger().info("Checking for late allocations...");
    try{
        logger.getLogger().info("Getting late allocations...");
        const lateAllocations = await allocations.getLateAllocations();
        if(lateAllocations.length < 1){
            logger.getLogger().info("No late allocations found.");
        } else {
            logger.getLogger().info("Sending notifications...");
            try{
                await slackApi.sendLateNotifications(lateAllocations);
                logger.getLogger().info("Late notifications successfully sent.");
            } catch (err) {
                logger.getLogger().error(`LATE NOTIFICATIONS FAILED!!! ${err}`);
            }
        }
    } catch (err) {
        logger.getLogger().error(`Error in checkForLateReminders() in server.js ${err}`)
    }
}


/**
 * Checks for any upcoming lessons and sends the appropriate notifications
 */
async function checkForUpcomingLessonReminders(){
    logger.getLogger().info("Checking for upcoming lesson reminders...");
    try{
        logger.getLogger().info("Getting upcoming lessons...");
        const upcomingLessons = await allocations.getUpcomingLessons();
        if(upcomingLessons.length < 1){
            logger.getLogger().info("No upcoming lessons found.");
        } else {
            logger.getLogger().info("Sending notifications...");
            try{
                await slackApi.sendUpcomingLessonNotifications(upcomingLessons);
                logger.getLogger().info("Upcoming lesson notifications successfully sent.");
            } catch (err) {
                logger.getLogger().error(`UPCOMING LESSON NOTIFICATIONS FAILED!!! ${err}`);
            }
        }
    } catch (err) {
        logger.getLogger().error(`Error in checkForUpcomingLessonReminders() in server.js ${err}`)
    }
}


setInterval(async () => {
    logger.getLogger().info("#### Beginning weekly tasks ####");
    try {
        await assertDGAAExists();
    } catch (err) {
        logger.getLogger().error(`Failure in assertDGAAExists() in server.js ${err}`);
    }
    try {
        await allocations.clearLastYearsAllocations();
    } catch (err) {
        logger.getLogger().error(`Failed in clearLastYearsAllocations() in server.js ${err}`);
    }
}, 6.048e8); // One week 6.048e8


setInterval(async () => {
    logger.getLogger().info("#### Beginning daily tasks ####");
    try{
        await checkForLateReminders();
        await checkForUpcomingLessonReminders();
    } catch (err) {
        logger.getLogger().error(`Failure in server daily actions ${err}`);
    }
    logger.getLogger().info("#### Finished daily tasks ####");
},  8.64e7) // One day 8.64e7