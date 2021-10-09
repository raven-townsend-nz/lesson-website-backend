const lessons = require('../controllers/lessons.controller.js')
const authenticate = require('../middleware/authenticate');

module.exports = function (app) {

    app.route('/lessons/allLessonsDropdownItems')
        /**
         * Returns a list of filter options for the all lessons page
         *
         * Response body example:
         *     {
         *         "codes": ["DRL", "LDR","AVS"],
         *         "yearLevels": [1, 2]
         *         "times": ["1 x 40min Period", "2 x 40min Period"],
         *         "whenToTeaches": []
         *     }
         */
        .get(authenticate.loginRequired, lessons.getAllLessonsDropDownItems);

    app.route('/lessons')
        /**
         * Creates a lesson
         *
         * Query parameter: confirm="true" means that the lesson will be updated even if
         * there is already a lesson with the same code, year level and lesson number.         * Request body example:
         *      {
         *        "lessonCode": "max4",
         *        "yearLevel": 5,
         *        "lessonNumber": 5,
         *        "title": "title",
         *        "lessonPlanRequired": true,
         *        "time": "x 40 periods?",
         *        "scope": "scope1, scope2",
         *        "trainingNotes": "these are the notes",
         *        "instructorNotes": "here are some activities",
         *        "references": "ref1, ref2, ref3"
         *      }
         */
        .post(authenticate.adminRequired, lessons.createLesson)

        /**
         * Gets ALL lessons
         *
         * Request body example:
         *      [
         *          {
         *              "id": 1,
         *              "code": "DRL",
         *              "yearLevel": 1,
         *              "lessonNumber": 1,
         *              "title": "Introduction to Drill",
         *              "time": "1 x 40min Period",
         *              "whenToTeach": null
         *          },
         *      ]
         */
        .get(authenticate.loginRequired, lessons.getAll);

    app.route('/lessons/:id/instructor-edit')

        /**
         * Updates the instructor notes of a lesson
         *
         * Request body example:
         * {
         *     instructorNotes: 'Test'
         * }
         */
        .patch(authenticate.loginRequired, lessons.editInstructorNotes);

    app.route('/lessons/:id/files')
        /**
         * Gets all the archived files for a lesson in a format like
         * [
             {
            "name": "1",
            "children": [
                {
                    "name": "fileName.pdf",
                    "type": "pdf",
                    "id": 1
                }
              ]
            }
          ]
         */
        .get(authenticate.loginRequired, lessons.getAllFiles);

    app.route('/lessons/:id')

        /**
         * Gets one lesson, with the ID in the request parameter
         *
         * Request body example:
         *      {
         *          "id": 1,
         *          "code": "DRL",
         *          "yearLevel": 1,
         *          "lessonNumber": 1,
         *          "title": "Introduction to Drill",
         *          "lessonPlanRequired": true,
         *          "time": "1 x 40min Period",
         *          "whenToTeach": null,
         *          "scope": "eg scope",
         *          "trainingNotes": "eg notes",
         *          "instructorNotes": "eg activities",
         *          "references": "eg references"
         *      }
         */
        .get(authenticate.loginRequired, lessons.getLesson)

        /**
         * Updates a lesson. Note that all fields need to be sent (for simplicity)
         *
         * Query parameter: confirm="true" means that the lesson will be updated even if
         * there is already a lesson with the same code, year level and lesson number.
         * Request body example:
         *      {
         *        "lessonCode": "max4",
         *        "yearLevel": 5,
         *        "lessonNumber": 5,
         *        "title": "title",
         *        "lessonPlanRequired": true,
         *        "time": "x 40 periods?",
         *        "whenToTeach": "term 1",
         *        "scope": "scope1, scope2",
         *        "trainingNotes": "these are the notes",
         *        "instructorNotes": "here are some activities",
         *        "references": "ref1, ref2, ref3"
         *      }
         */
        .patch(authenticate.adminRequired, lessons.editLesson)

        .delete(authenticate.adminRequired, lessons.deleteLesson);

}