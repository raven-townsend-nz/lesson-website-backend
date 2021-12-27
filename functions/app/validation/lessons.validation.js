const validation = require('./common.validation');

exports.validateLesson = function (lesson) {
    if (!validation.isValidRequiredString(lesson.lessonCode)) {
        return false;
    } if (!validation.isValidRequiredInt(lesson.yearLevel)) {
        return false;
    } if (!validation.isValidRequiredInt(lesson.lessonNumber)) {
        return false;
    } if (!validation.isValidRequiredString(lesson.title)) {
        return false;
    } if (!validation.isValidRequiredBool(lesson.lessonPlanRequired)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.time)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.whenToTeach)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.scope)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.trainingNotes)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.instructorNotes)) {
        return false;
    } if (!validation.isValidOptionalString(lesson.references)) {
        return false;
    } if (
        lesson.lessonCode.length > 4 ||
        lesson.title.length > 128 ||
        (lesson.time !== undefined && lesson.time.length > 128) ||
        (lesson.whenToTeach !== undefined && lesson.whenToTeach.length > 1024) ||
        (lesson.scope !== undefined && lesson.scope.length > 1024) ||
        (lesson.trainingNotes !== undefined && lesson.trainingNotes.length) > 1024 ||
        (lesson.instructorNotes !== undefined && lesson.instructorNotes.length > 1024) ||
        (lesson.references !== undefined && lesson.references.length) > 1024
    ) {
        return false
    } if (lesson.yearLevel < 1 || lesson.yearLevel > 5) {
        return false
    } if (lesson.lessonNumber < 0) {
        return false
    }
    return true;
};


exports.validateInstructorNotes = function (data) {
    if (!validation.isValidRequiredString(data.instructorNotes)) {
        return false;
    } else if (data.instructorNotes.length > 1024) {
        return false;
    } else {
        return true;
    }
}