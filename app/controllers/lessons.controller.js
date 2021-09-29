const lessons = require('../models/lessons.models');
const validation = require('../validation/lessons.validation');
const storage = require('../models/storage.models');
const logger = require("../../config/logger");

exports.createLesson = async function (req, res) {
    try {
        const valid = validation.validateLesson(req.body);
        if (!valid) {
            res.status(400).send('One or more of the fields do not follow the correct format');
        } else {
            let data = req.body;
            let lesson = await lessons.checkForUniqueness(data.lessonCode, data.yearLevel, data.lessonNumber);
            if (lesson !== null && req.query.confirm !== "true") {
                res.status(409).send('Lesson with that code, year level, and number already exists');
                return;
            }
            let lessonId = await lessons.createLesson(data);
            res.status(201).send({"lessonId": lessonId});
        }
    } catch (err) {
        logger.getLogger().error(`Error in createLesson(), lessons.controller, ${err}`);
        res.status(500).send();
    }
};

exports.editLesson = async function (req, res) {
    try {
        let lessonId = req.params.id;
        let lesson = await lessons.getLesson(lessonId);
        if (lesson === null) {
            res.status(404).send("No lessons with that ID exist");
            return;
        }
        const valid = validation.validateLesson(req.body);
        if (!valid) {
            res.status(400).send('One or more of the fields do not follow the correct format');
            return;
        }

        let data = req.body;
        let changingCode = (lesson.lessonCode !== data.lessonCode) || (lesson.yearLevel !== data.yearLevel) || (lesson.lessonNumber !== data.lessonNumber);
        let duplicateLesson = await lessons.checkForUniqueness(data.lessonCode, data.yearLevel, data.lessonNumber, lessonId);
        if (changingCode && duplicateLesson !== null && req.query.confirm !== "true") {
            res.status(409).send('Lesson with that code, year level, and number already exists');
            return;
        }
        await lessons.editLesson(req.params.id, data);
        res.status(201).send("Lesson updated");
    } catch (err) {
        logger.getLogger().error(`Error in editLesson(), lessons.controller, ${err}`);
        res.status(500).send();
    }
};


exports.editInstructorNotes = async function (req, res) {
    try {
        const lessonId = parseInt(req.params.id);
        let lesson = await lessons.getLesson(lessonId);
        if (lesson === null) {
            res.status(404).send("No lessons with that ID exist");
            return;
        }
        const valid = validation.validateInstructorNotes(req.body);
        if (!valid) {
            res.status(400).send('Instructor notes is compulsory and must be a string less than 1024 characters');
            return;
        }
        await lessons.editInstructorNotes(lessonId, req.body.instructorNotes);
        res.status(200).send("Lesson updated");
    } catch (err) {
        logger.getLogger().error(`Error in editInstructorNotes(), lessons.controller, ${err}`);
        res.status(500).send();
    }
}

exports.getLesson = async function (req, res) {
  try {
      const lesson = await lessons.getLesson(req.params.id);
      if (lesson) {
          let lessonJson = {
              id: lesson.id,
              code: lesson.code,
              yearLevel: lesson.year_level,
              lessonNumber: lesson.lesson_number,
              title: lesson.title,
              lessonPlanRequired: !!lesson.lesson_plan_required,
              time: lesson.time,
              whenToTeach: lesson.when_to_teach,
              scope: lesson.scope,
              trainingNotes: lesson.training_notes,
              instructorNotes: lesson.instructor_notes,
              references: lesson.references
          }
          res.statusMessage = 'OK';
          res.status(200).json(lessonJson);
      } else {
          res.statusMessage = 'Not Found';
          res.status(404).send();
      }
  } catch (err) {
      logger.getLogger().error(`Error in getLesson(), lessons.controller, ${err}`);
      res.status(500).send();
  }
};

exports.getAll = async function (req, res) {
    try {
        let jsonArray = [];
        if (req.query.taughtCount === 'true') {
            const allLessons = await lessons.getAllWithTaughtCount();
            for (let i = 0; i < allLessons.length; i++) {
                let lesson = allLessons[i];
                jsonArray.push({
                    id: lesson.id,
                    code: lesson.code,
                    yearLevel: lesson.year_level,
                    lessonNumber: lesson.lesson_number,
                    title: lesson.title,
                    time: lesson.time,
                    whenToTeach: lesson.when_to_teach,
                    taughtCount: lesson.allocated_lesson === null ? 0 : lesson.taught_count,
                    lessonPlanRequired: lesson.lesson_plan_required
                })
            }
        } else {
            const allLessons = await lessons.getAll();
            for (let i = 0; i < allLessons.length; i++) {
                let lesson = allLessons[i];
                jsonArray.push({
                    id: lesson.id,
                    code: lesson.code,
                    yearLevel: lesson.year_level,
                    lessonNumber: lesson.lesson_number,
                    title: lesson.title,
                    time: lesson.time,
                    whenToTeach: lesson.when_to_teach,
                })
            }
        }
        res.status(200).send(jsonArray);
    } catch (err) {
        logger.getLogger().error(`Error in getAll(), lessons.controller, ${err}`);
        res.status(500).send();
    }
};

exports.getAllLessonsDropDownItems = async function (req, res) {
  try {
      const allItems = (await lessons.getAllLessonsDropDownItems());
      res.status(200).send(allItems);
  } catch (err) {
      logger.getLogger().error(`Error in getAllLessonsDropDownItems(), lessons.controller, ${err}`);
      res.status(500).send();
  }
};

exports.deleteLesson = async function (req, res) {
    try {
        const lessonId = req.params.id;

        const lesson = await lessons.getLesson(lessonId);
        if (lesson === null) {
            res.status(404).send("No lesson with that ID exists");
            return;
        }
        await lessons.deleteLesson(lessonId);
        res.status(200).send(`Lesson ${lessonId} deleted`);
    } catch (err) {
        logger.getLogger().error(`Error in deleteLesson(), lessons.controller, ${err}`);
        res.status(500).send();
    }
};



exports.getAllFiles = async function (req, res) {
  try {
      const lessonId = parseInt(req.params.id);
      const lesson = await lessons.getLesson(lessonId);
      if (lesson === null) {
          res.status(404).send('Lesson not found');
          return;
      }
      const fileData = await lessons.getAllFiles(lessonId);
      res.status(200).send(fileData);
  } catch (err) {
      logger.getLogger().error(`Error in getAllFiles(), lessons.controller, ${err}`);
      res.status(500).send();
  }
};
