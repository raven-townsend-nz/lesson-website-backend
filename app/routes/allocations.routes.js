const allocations = require('../controllers/allocations.controller.js')
const authenticate = require('../middleware/authenticate');

module.exports = function (app) {
    /*
    POST
        BODY: {
            userId, int
            lessonId, int
            yearGroup, int
            period, int
            date, Date.toJSON
        }
        Creates the allocation with the data in request body

     */
    app.route('/allocations')
        .post(authenticate.adminRequired, allocations.allocate)
        .get(authenticate.adminRequired, allocations.getAllAllocations);

    app.route('/users/:id/allocations')
        .get(authenticate.loginRequired, allocations.getAllocationsForUser)

    app.route('/allocations/:id/feedback')
        .patch(authenticate.adminRequired, allocations.updateFeedback);

    app.route('/allocations/:id')
        .delete(authenticate.adminRequired, allocations.deleteAllocation)
        .get(authenticate.loginRequired, allocations.getOneAllocation)
        .patch(authenticate.adminRequired, allocations.patchAllocation)

    app.route('/allocations/:id/state')
        .patch(authenticate.adminRequired, allocations.updateAllocationState);

    app.route('/allocations/:id/files')
        .get(authenticate.loginRequired, allocations.getAllocationFiles)
};
