const storage = require('../controllers/storage.controller');
const authenticate = require('../middleware/authenticate');
const multer  = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }});
// const upload = multer({dest: 'storage/'});


module.exports = function (app) {

    /**
     * Archives an allocation's file by inserting a new field into archived_files with the
     * corresponding lesson, file, and generated group name: <Year> (lastNameOfInstructor1,...)
     * Only requires the file's id in the request's variables.
     */
    app.route('/storage/:id/archive')
        .post(authenticate.adminRequired, storage.archive);

    app.route('/storage/directArchive')
        .post(authenticate.adminRequired, upload.single('file'), storage.directArchive);

    app.route('/storage/:id')
        .get(authenticate.loginRequired, storage.getFile) // gets the google storage url for the file
        .delete(authenticate.adminRequired, storage.deleteArchivedFile);

    app.route('/allocations/:id/files')
        .post(authenticate.loginRequired, storage.uploadToAllocation);

    app.route('/allocations/:allocationId/files/:fileId')
        .delete(authenticate.loginRequired, storage.deleteAllocationFile);

    app.route('/storage/:id/isArchived')
        .get(authenticate.adminRequired, storage.getIsFileArchived);
};
