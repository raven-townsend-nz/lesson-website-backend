const db = require('../../config/db');
const userModel = require('./users.models');
const storage = require('./storage.models');
const logger = require("../../config/logger");

/**
 * Checks if the input combination exists in a row in lesson-allocations.
 * Returns true if that combination exists already.
 * @param instructorId
 * @param period
 * @param date
 * @param allocationId
 * @returns {Promise<boolean>}
 */
exports.compoundKeyInAllocations = async function (allocationId, instructorId, period, date) {
    date = new Date(date);
    const checkSql = "SELECT * FROM lesson_allocations AS L JOIN allocated_instructors AS I ON L.id = I.allocation_id WHERE I.instructor_id = ? AND L.date = DATE(?) AND (L.period = ? OR L.period = 'Both' OR ? = 'Both') AND I.allocation_id != ?;";
    const [response] = await db.getPool().query(checkSql, [instructorId, date, period, period, allocationId]);
    return response.length > 0;
}

exports.createAllocation = async function (data) {
    const userIds = data.userIds;
    const lessonId = data.lessonId;
    const yearGroup = data.yearGroup;
    const period = data.period;
    const date = data.date;
    const lessonPlanRequired = data.lessonPlanRequired;
    let stateId;
    if (lessonPlanRequired) {
        stateId = 1; // Not Submitted
    } else {
        stateId = 3; // Approved
    }

    const insertSql = 'INSERT INTO `lesson_allocations` (`lesson_id`, `year_group`, `period`, `date`, `state_id`, `lesson_plan_required`) VALUES (?, ?, ?, ?, ?, ?);';
    const allocationId = (await db.getPool().query(insertSql, [lessonId, yearGroup, period, date, stateId, lessonPlanRequired]))[0].insertId;

    const instructorSql = 'INSERT INTO `allocated_instructors` (`allocation_id`, `instructor_id`) VALUES (?, ?);';
    for (let userId of userIds) {
        await db.getPool().query(instructorSql, [allocationId, userId]);
    }
    return allocationId;
};

exports.deleteAllocation = async function (allocationId) {
    await deleteAllocationFiles(allocationId);
    const deleteSql = "DELETE FROM lesson_allocations WHERE id = ?;";
    await db.getPool().query(deleteSql, [allocationId]);

};

/**
 * Delete files from /storage and from allocation_files table relating for a given allocation
 * @param allocationId of allocation to delete files of
 * @returns {Promise<void>}
 */
deleteAllocationFiles = async function (allocationId) {
    const getFilesSql = "SELECT A.file_id, F.filename FROM allocation_files A JOIN file_submissions F ON A.file_id = F.id WHERE A.allocation_id = ?";
    let [res] = await db.getPool().query(getFilesSql, [allocationId]);
    for (let row of res) {
        const filename = row.file_id + '-' + row.filename;
        await storage.deleteAllocationFile(filename, row.file_id);
    }
    const deleteAllocationFilesSql = "DELETE FROM allocation_files WHERE allocation_id = ?";
    await db.getPool().query(deleteAllocationFilesSql, [allocationId]);
}

/**
 * Gets an allocation and all associated instructors
 * @param allocationId
 * @returns {Promise<null|*>}
 */
exports.getAllocation = async function (allocationId){
    const getAllocationsSql = "SELECT * FROM lesson_allocations JOIN state ON lesson_allocations.state_id = state.id  " +
        "WHERE  lesson_allocations.id = ?;";
    const [result] = await db.getPool().query(getAllocationsSql, [allocationId]);
    if (result.length === 0) {
        return null;
    }
    let allocation = result[0];

    const getUserIdsSql = "SELECT instructor_id FROM allocated_instructors WHERE allocation_id = ?";
    const [userIdRows] = await db.getPool().query(getUserIdsSql, [allocationId]);

    let instructorIds = [];
    for (let row of userIdRows) {
        instructorIds.push(row.instructor_id)
    }
    allocation.instructorIds = instructorIds;
    return allocation;
};

exports.getAllocationsForUser = async function (userId, showPast) {
    let filterPastCurrent = showPast === "true" ? "A.date < CURDATE()" : "A.date >= CURDATE()";
    const getSql = `SELECT A.id, A.lesson_id, A.year_group, A.period, A.date, A.lesson_plan_required, S.state, L.code, L.year_level, L.lesson_number, L.title FROM (lesson_allocations AS A JOIN state S ON A.state_id = S.id JOIN allocated_instructors I ON I.allocation_id = A.id JOIN lessons L on A.lesson_id = L.id) WHERE I.instructor_id = ? AND ${filterPastCurrent} ORDER BY date;`;
    let allocations = (await db.getPool().query(getSql, [userId]))[0];

    let formattedAllocations = [];
    for (let allocation of allocations) {
        let formattedAllocation = {
            id: allocation.id,
            lessonId: allocation.lesson_id,
            yearGroup: allocation.year_group,
            period: allocation.period,
            date: allocation.date,
            state: allocation.state,
            instructors: await this.getAllInstructors(allocation.id),
            code: allocation.code,
            yearLevel: allocation.year_level,
            lessonNumber: allocation.lesson_number,
            title: allocation.title,
            lessonPlanRequired: allocation.lesson_plan_required
        }
        formattedAllocations.push(formattedAllocation)
    }
    return formattedAllocations;
};

exports.getAllAllocations = async function (showPast) {
    let filterPastCurrent = showPast === "true" ? "A.date < CURDATE()" : "A.date >= CURDATE()";
    const getSql = `SELECT DISTINCT A.id, A.lesson_id, A.year_group, A.lesson_plan_required, A.period, A.date, S.state, L.code, L.year_level, L.lesson_number, L.title FROM (lesson_allocations AS A JOIN state S ON A.state_id = S.id JOIN allocated_instructors I ON I.allocation_id = A.id JOIN lessons L on A.lesson_id = L.id) WHERE ${filterPastCurrent} ORDER BY date ASC;`;
    let allocations = (await db.getPool().query(getSql))[0];
    let formattedAllocations = [];
    for (let allocation of allocations) {
        let formattedAllocation = {
            id: allocation.id,
            lessonId: allocation.lesson_id,
            yearGroup: allocation.year_group,
            period: allocation.period,
            date: allocation.date,
            state: allocation.state,
            instructors: await this.getAllInstructors(allocation.id),
            code: allocation.code,
            yearLevel: allocation.year_level,
            lessonNumber: allocation.lesson_number,
            title: allocation.title,
            lessonPlanRequired: allocation.lesson_plan_required
        }
        formattedAllocations.push(formattedAllocation);
    }
    return formattedAllocations;
}

/**
 * Gets full details (including lesson columns) of a lesson allocation
 * @param allocationId
 * @returns {Promise<null|{date: (null|*), period: (null|*), code, lessonPlanRequired: *, references: (string|*), lessonId: *, whenToTeach: *, title, instructors: *[], yearGroup: *, trainingNotes: *, lessonNumber: *, yearLevel: *, scope: (string|*|string), id, state: any, time: (string|*|((label?: string) => void)|number), instructorIds: *}>}
 */
exports.getOneAllocation = async function (allocationId) {
    const getSql = "SELECT A.id, A.lesson_id, A.year_group, A.period, A.date, A.feedback, S.state, L.code, L.year_level, L.lesson_number, L.title, A.lesson_plan_required, L.time, L.when_to_teach, L.scope, L.training_notes, L.instructor_notes, L.`references` FROM (lesson_allocations AS A JOIN state AS S ON A.state_id = S.id JOIN lessons L on A.lesson_id = L.id) WHERE A.id = ?;";
    let [allocations] = await db.getPool().query(getSql, [allocationId]);
    if (allocations.length === 0) {
        return null;
    } else {
        let allocation = {
            id: allocations[0].id,
            lessonId: allocations[0].lesson_id,
            yearGroup: allocations[0].year_group,
            period: allocations[0].period,
            date: allocations[0].date,
            state: allocations[0].state,
            instructors: await this.getAllInstructors(allocations[0].id),
            code: allocations[0].code,
            yearLevel: allocations[0].year_level,
            lessonNumber: allocations[0].lesson_number,
            title: allocations[0].title,
            lessonPlanRequired: allocations[0].lesson_plan_required,
            time: allocations[0].time,
            whenToTeach: allocations[0].when_to_teach,
            scope: allocations[0].scope,
            trainingNotes: allocations[0].training_notes,
            instructorNotes: allocations[0].instructor_notes,
            references: allocations[0].references,
            feedback: allocations[0].feedback
        }
        allocation.instructors = await this.getAllInstructors(allocationId);
        return allocation;
    }
}


exports.getAllInstructors = async function (allocationId) {
    const getUserIdsSql = "SELECT * FROM users WHERE id in (SELECT instructor_id FROM allocated_instructors WHERE allocation_id = ?)";
    const [usersResult] = await db.getPool().query(getUserIdsSql, [allocationId]);
    let users = [];
    for (let user of usersResult) {
        const userObj = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            slackId: user.slack_id,
        }
        users.push(userObj);
    }
    return users;
};

exports.checkUserIsInstructor = async function (userId, allocationId) {
    const instructors = await this.getAllInstructors(allocationId);
    let userIsInstructor = false;
    for (let instructor of instructors) {
        if (instructor.id === Number.parseInt(userId)) {
            userIsInstructor = true;
        }
    }
    return userIsInstructor;
}

exports.patchAllocation = async function (allocationId, data, instructorIdsChanged){
    const userIds = data.userIds;
    const lessonId = data.lessonId;
    const yearGroup = data.yearGroup;
    const period = data.period;
    const date = data.date;
    const lessonPlanRequired = data.lessonPlanRequired;

    const patchSql = "UPDATE lesson_allocations SET lesson_id = ?, year_group = ?, period = ?, date = ?, lesson_plan_required = ? WHERE id = ?;";
    await db.getPool().query(patchSql, [lessonId, yearGroup, period, date, lessonPlanRequired, allocationId]);

    if (instructorIdsChanged) {
        const deleteInstructorsSql = 'DELETE FROM allocated_instructors WHERE allocation_id = ?;';
        await db.getPool().query(deleteInstructorsSql, [allocationId]);

        const instructorSql = 'INSERT INTO `allocated_instructors` (`allocation_id`, `instructor_id`) VALUES (?, ?);';
        for (let userId of userIds) {
            await db.getPool().query(instructorSql, [allocationId, userId]);
        }
    }
};

exports.getStateIdFromName = async function (stateName) {
    const getStateIdSql = 'SELECT id FROM state WHERE state = ?;';
    const [result] = await db.getPool().query(getStateIdSql, [stateName]);
    if (result) {
        return Number.parseInt(result[0].id);
    } else {
        return null;
    }
}

exports.getAllocationState = async function (stateId) {
    const getStateSql = 'SELECT id FROM state WHERE id = ?;';
    const [result] = await db.getPool().query(getStateSql, [stateId]);
    if (result.length === 0) {
        return null;
    } else {
        return result[0];
    }
}

/**
 * Updates the state of an allocation
 * @param allocationId the ID of the allocation to be updated
 * @param newState the state ID of the new state
 * @returns {Promise<void>}
 */
exports.updateAllocationState = async function (allocationId, newState){
    const patchSql = "UPDATE lesson_allocations SET state_id = ? WHERE id = ?;";
    await db.getPool().query(patchSql, [newState, Number.parseInt(allocationId)]);
}

exports.getLateAllocations = async function () {
    //Selects id, lesson_id, and date from lesson_allocations where the lesson plan has not yet been submitted and it is is late
    // It is late because the lesson date is 21 days in front of the current day
    // This is then joined to allocated instructors and lessons to get the instructors to notify and the lesson title to include in the notifications.
    const getAllocationsSql = "SELECT L.code AS code, L.year_level AS yearLevel, L.lesson_number AS lessonNumber, L.title AS title, A.date AS date, U.slack_id AS slackId, U.first_name AS firstName, U.last_name AS lastName FROM "+
    "(SELECT * FROM lesson_allocations WHERE state_id = 1 AND date = ADDDATE(CURDATE(), ?)) A " + //gets late allocations which have not seen a submission
    "LEFT JOIN allocated_instructors I ON A.id = I.allocation_id " + // gets the instructors
    "LEFT JOIN lessons L ON A.lesson_id = L.id " + // gets the lesson titles
    "LEFT JOIN users U on I.instructor_id = U.id"; // gets the slack id from users table
    return (await db.getPool().query(getAllocationsSql, [process.env.LESSON_PLAN_DUE]))[0];
};

exports.getUpcomingLessons = async function () {
    const getUpcomingLessonsSql = "SELECT L.code AS code, L.year_level AS yearLevel, L.lesson_number AS lessonNumber, L.title AS title, A.date AS date, U.slack_id AS slackId, U.first_name AS firstName, U.last_name AS lastName FROM "+
        "(SELECT * FROM lesson_allocations WHERE date = ADDDATE(CURDATE(), ?)) A " + //gets late allocations which have not seen a submission
        "LEFT JOIN allocated_instructors I ON A.id = I.allocation_id " + // gets the instructors
        "LEFT JOIN lessons L ON A.lesson_id = L.id " + // gets the lesson titles
        "LEFT JOIN users U on I.instructor_id = U.id"; // gets the slack id from users table
    return (await db.getPool().query(getUpcomingLessonsSql, [process.env.UPCOMING_LESSON_DAYS]))[0];
};

exports.getAllocationFiles = async function (allocationId) {
    const getSql = "SELECT file_id AS id, filename AS name FROM allocation_files join file_submissions fs on fs.id = allocation_files.file_id WHERE allocation_id = ?";
    const files = (await db.getPool().query(getSql, [allocationId]))[0];
    let formatted = [
        {
            name: "Your Lesson Files",
            children: [],
        }
    ];
    for (let fileData of files) { // for each file in the group
        formatted[0].children.push({  // add its details to the group object
            name: fileData.name,
            type: fileData.name.split('.').pop(),
            id: fileData.id
        });
    }
    return formatted;

};

exports.clearLastYearsAllocations = async function () {
    const clearSql = "SELECT * FROM lesson_allocations WHERE date < ?;";
    let cutOffDate = new Date();
    cutOffDate.setFullYear(new Date().getFullYear() - 1);
    cutOffDate.setMonth(11);
    cutOffDate.setDate(31);
    logger.getLogger().info("Deleting all allocations for " + cutOffDate.getFullYear() + " (and earlier)");
    const [oldAllocations] = await db.getPool().query(clearSql, [cutOffDate]);
    for (let allocation of oldAllocations) {
        await this.deleteAllocation(allocation.id);
    }
}


exports.updateAllocationFeedback = async function (allocationId, feedback) {
    const updateFeedbackSql = "UPDATE lesson_allocations SET feedback = ? WHERE id = ?;";
    await db.getPool().query(updateFeedbackSql, [feedback, allocationId]);
}
