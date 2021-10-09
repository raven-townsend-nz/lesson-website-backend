const db = require('../../config/db');
const storage = require("./storage.models");


//ignoreId = the id to ignore when checking for uniqueness
// Leaving ignoreId as null will cause the sql command to fail
exports.checkForUniqueness = async function (lessonCode, yearLevel, lessonNumber, ignoreId) {
    if(typeof ignoreId == 'undefined'){
        ignoreId = 0;
    }

    const sql = 'SELECT * FROM lessons WHERE code = ? AND year_level = ? AND lesson_number = ? AND id != ?;';
    const lessons = (await db.getPool().query(sql, [lessonCode, yearLevel, lessonNumber, ignoreId]))[0];
    if (lessons.length < 1) {
        return null;
    } else {
        return lessons[0];
    }
};

exports.createLesson = async function (data) {
    let code = data.lessonCode.toUpperCase();
    let yearLevel = data.yearLevel;
    let lessonNumber = data.lessonNumber;
    let title = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    let lessonPlanRequired = data.lessonPlanRequired;
    let time = data.time;
    let whenToTeach = data.whenToTeach;
    let scope = data.scope;
    let trainingNotes = data.trainingNotes;
    let instructorNotes = data.instructorNotes;
    let references = data.references;
    const insert_user = 'INSERT INTO lessons (code, year_level, lesson_number, title, lesson_plan_required, time, when_to_teach, scope, training_notes, instructor_notes, `references`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const [result] = await db.getPool().query(insert_user, [code, yearLevel, lessonNumber, title, lessonPlanRequired, time, whenToTeach, scope, trainingNotes, instructorNotes, references]);
    return result.insertId;
};

exports.editLesson = async function (lessonId, data) {
    let code = data.lessonCode.toUpperCase();
    let yearLevel = data.yearLevel;
    let lessonNumber = data.lessonNumber;
    let title = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    let lessonPlanRequired = data.lessonPlanRequired;
    let time = data.time;
    let whenToTeach = data.whenToTeach;
    let scope = data.scope;
    let trainingNotes = data.trainingNotes;
    let instructorNotes = data.instructorNotes;
    let references = data.references;
    const updateLessonSql = 'UPDATE lessons SET code = ?, year_level = ?, lesson_number = ?, title = ?, lesson_plan_required = ?, time = ?, when_to_teach = ?, scope = ?, training_notes = ?, instructor_notes = ?, `references` = ? WHERE id = ?;';
    const [result] = await db.getPool().query(updateLessonSql, [code, yearLevel, lessonNumber, title, lessonPlanRequired, time, whenToTeach, scope, trainingNotes, instructorNotes, references, lessonId]);
    return result.insertId;
};


exports.editInstructorNotes = async function (lessonId, instructorNotes) {
    const updateInstructorNotesSql = 'UPDATE lessons SET instructor_notes = ? WHERE id = ?;';
    const [result] = await db.getPool().query(updateInstructorNotesSql, [instructorNotes, lessonId]);
    return result.insertId;
}

exports.getLesson = async function (lessonId) {
    const sql = 'SELECT * FROM lessons WHERE id = ?';
    const lessons = await db.getPool().query(sql, [lessonId]);
    if (lessons[0].length < 1) {
        return null;
    } else {
        return lessons[0][0];
    }

};

exports.getAll = async function () {
    const sql = 'SELECT id, code, year_level, lesson_number, title, time, when_to_teach FROM lessons;'
    return (await db.getPool().query(sql))[0];
}

exports.getAllWithTaughtCount = async function () {
    const sql = 'SELECT L.id AS id, A.lesson_id AS allocated_lesson, code, year_level, lesson_number, title, time, when_to_teach, L.lesson_plan_required, COUNT(*) AS taught_count FROM lessons AS L LEFT JOIN lesson_allocations AS A ON L.id = A.lesson_id GROUP BY L.id, A.lesson_id, code, year_level, lesson_number, title, time, when_to_teach ORDER BY code, year_level, lesson_number, title;';
    return (await db.getPool().query(sql))[0];
}

exports.getAllLessonsDropDownItems = async function () {
    const sql = '' +
        'SELECT DISTINCT code FROM lessons;' +
        'SELECT DISTINCT year_level FROM lessons; ' +
        'SELECT DISTINCT time FROM lessons; ' +
        'SELECT DISTINCT when_to_teach FROM lessons;'
    let result = {codes: [], yearLevels: [], times: [], whenToTeaches: []};
    let allItemsRaw = (await db.getPool().query(sql))[0];
    for (let code of allItemsRaw[0]) {
        if (code.code !== null && code.code.length > 0) {
            result.codes.push(code.code);
        }
    }
    for (let yearLevel of allItemsRaw[1]) {
        if (yearLevel.year_level !== null && yearLevel.year_level > 0) {
            result.yearLevels.push(yearLevel.year_level);
        }
    }
    for (let time of allItemsRaw[2]) {
        if (time.time !== null && time.time.length > 0) {
            result.times.push(time.time);
        }
    }
    for (let whenToTeach of allItemsRaw[3]) {
        if (whenToTeach.when_to_teach !== null && whenToTeach.when_to_teach.length > 0) {
            result.whenToTeaches.push(whenToTeach.when_to_teach);
        }
    }

    return result;
}

exports.deleteLesson = async function (lessonId) {
    await deleteLessonFiles(lessonId);
    const deleteLessonSql = 'DELETE FROM lessons WHERE id = ?;';
    await db.getPool().query(deleteLessonSql, [lessonId]);
};

deleteLessonFiles = async function (lessonId) {
  const selectFromAllocationsSql = "SELECT DISTINCT file_id, filename FROM lesson_allocations la JOIN allocation_files af ON la.id = af.allocation_id JOIN file_submissions fs ON fs.id = af.file_id WHERE la.lesson_id = ?";
  let [allocationResults] = await db.getPool().query(selectFromAllocationsSql, [lessonId]);

  const selectFromArchived = "SELECT DISTINCT file_id, filename FROM archived_files af JOIN file_submissions fs ON af.file_id = fs.id WHERE af.lesson_id = ?";
  let [archivedResults] = await db.getPool().query(selectFromArchived, [lessonId]);

  const res = allocationResults.concat(archivedResults);

  for (let row of res) {
      const filename = row.file_id + '-' + row.filename;
      await storage.deleteFile(filename, row.file_id);
  }
};

exports.getAllFiles = async function (lessonId) {
    const getSQL = "SELECT " +
        "file_id AS id, filename AS name, lesson_id AS lessonId, `group` " +
        "FROM file_submissions INNER JOIN archived_files ON file_submissions.id = archived_files.file_id " +
        "WHERE lesson_id = ? AND `group` = ?;";

    const getGroupsSQL = "SELECT DISTINCT `group` FROM archived_files WHERE lesson_id = ?;";
    const groups = (await db.getPool().query(getGroupsSQL, [lessonId]))[0]; //unique groups from lesson

    let formatted = [];
    for (let group of groups) { // for each unique group
        let currentGroup = group.group
        let formattedGroup = { // form the object for the group
            name: currentGroup,
            children: []
        }
        const groupFiles = (await db.getPool().query(getSQL, [lessonId, currentGroup]))[0]; //get the file data for that group
        for (let fileData of groupFiles) { // for each file in the group
            formattedGroup.children.push({  // add its details to the group object
                name: fileData.name,
                type: fileData.name.split('.').pop(),
                id: fileData.id
            });
        }
        formatted.push(formattedGroup);
    }
    return formatted
}
