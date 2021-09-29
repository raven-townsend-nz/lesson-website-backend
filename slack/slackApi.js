const logger = require("../config/logger");

const slackAxiosInstance = require("./slack-axios-instance").slackAxiosInstance;

// Sends a private message to the slack id user
const sendMessageTo = function (message, slackId) {
    message = message.split("&").join("%26");
    const appendage = `channel=${slackId}&text=${message}&markdwn=true`;

    return slackAxiosInstance.post(`/chat.postMessage`, appendage)
        .then(res => res);
};


exports.sendLateNotifications = async function (lateAllocations){
    for (let row of lateAllocations){
        let message = "*Lesson Plan Overdue*\n";
        message += `Your lesson plan for ${row.code} ${row.yearLevel}.${row.lessonNumber} ${row.title} is now overdue :cadet-net:\n`;
        const formattedDate = `${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`;
        message += `You are teaching this lesson on ${formattedDate}.\n`;
        message += "Please login to the <https://lessons.17squadronatc.com/|lesson website> to submit your lesson plan";

        try {
            await sendMessageTo(message, row.slackId);
            logger.getLogger().info(`Sent late notification to ${row.slackId}`);
        } catch (err) {
            logger.getLogger().error(`Failed to send late lesson plan notification to ${row.slackId} ${err}`);
        }
    }
};

exports.sendUpcomingLessonNotifications = async function (upcomingLessons){
    for (let row of upcomingLessons){
        let message = "*Lesson Reminder*\n";
        message += `Your lesson, ${row.code} ${row.yearLevel}.${row.lessonNumber} ${row.title}, is happening soon.\n`;
        const formattedDate = `${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`;
        message += `You are teaching this lesson on ${formattedDate}.\n`;
        try {
            await sendMessageTo(message, row.slackId);
            logger.getLogger().info(`Sent upcoming lesson notification to ${row.slackId}`);
        } catch (err) {
            logger.getLogger().error(`Failed to send upcoming lesson notification to ${row.slackId} ${err}`);
        }
    }
};
