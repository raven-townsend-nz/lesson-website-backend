const storage = require('../models/storage.models');
const logger = require("../../config/logger");
const allocations = require('../models/allocations.models');

const acceptedTypes = [
    'application/msword', //.doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //.docx
    'application/vnd.ms-powerpoint', //.ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', //.pptx
    'application/pdf', //.pdf
]

exports.directArchive = async function (req, res) {
    try {
        const fileContents = req.body;
        const fileName = req.query.filename;
        const group = req.query.group;
        const lessonId = req.query.lessonId;
        if (fileName === null || group === null || lessonId === null) {
            res.status(400).send("One of the required query parameters (fileName, group, lessonId) is missing");
            return;
        }
        const contentType = req.header("Content-Type");

        if (fileContents === undefined){
            res.status(400).send("File contents are empty");
            return;
        } else if (!(acceptedTypes.includes(contentType))) {
            res.status(400).send("Content type not accepted");
            return;
        }

        const fileId = (await storage.uploadToArchive(fileContents, contentType, fileName, group, lessonId));
        res.status(200).send({fileId: fileId});

    } catch (err) {
        logger.getLogger().error(`Error in directArchive(), storage.controller, ${err}`);
        res.status(500).send();
    }

};

exports.uploadToAllocation = async function (req, res) {
    try {
        const fileContents = req.body;
        const fileName = req.query.filename;
        const allocationId = req.query.allocationId;
        if (fileName === null || allocationId === null) {
            res.status(400).send("One of the required query parameters (fileName, allocationId) is missing");
            return;
        }
        const contentType = req.header("Content-Type");

        if (fileContents === undefined){
            res.status(400).send("File contents are empty");
            return;
        } else if (!(acceptedTypes.includes(contentType))) {
            res.status(400).send("Content type not accepted");
            return;
        }
        const userId = req.authenticatedUserId;
        let userIsInstructor = await allocations.checkUserIsInstructor(userId, allocationId);
        if (userIsInstructor || req.isAdmin) {
            const fileId = (await storage.uploadToAllocation(fileContents, contentType, fileName, allocationId));
            const pendingStateID = 2;
            await allocations.updateAllocationState(allocationId, pendingStateID);
            res.status(200).send({fileId: fileId});
        } else {
            res.status(403).send('User must be an allocation instructor or an admin');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

exports.getFile = async function (req, res) {
    try {
        const fileId = req.params.id;
        const storedName = await storage.getFileName(fileId);
        if (storedName === null) {
            res.status(404).send("No File with that ID exists");
        } else {

            const fileDetails = await storage.retrieveFile(storedName);
            if (fileDetails === null) {
                res.status(404).send('File Not Found');
            } else {
                res.status(200).contentType(fileDetails.mimeType).send(fileDetails.file);
            }
        }

    }  catch (err) {
        logger.getLogger().error(`Error in getFile(), storage.controller, ${err}`);
        res.status(500).send();
    }
};

exports.deleteArchivedFile = async function (req, res) {
    try {
        const fileId = req.params.id;
        const fileName = await storage.getFileName(fileId);
        const archiveFile = await storage.getFileFromTable('archived_files', fileId);
        if (fileName === null || archiveFile === null) {
            res.status(404).send('File not found');
            return;
        }
        await storage.deleteArchivedFile(fileName, fileId);
        res.status(200).send();

    }  catch (err) {
        logger.getLogger().error(`Error in deleteFile(), storage.controller, ${err}`);
        res.status(500).send();
    }
};

exports.deleteAllocationFile = async function (req, res) {
  try {
      const fileId = req.params.fileId;
      const allocationId = req.params.allocationId;
      const fileName = await storage.getFileName(fileId);
      const allocationFile = await storage.getFileFromTable('allocation_files', fileId);
      if (fileName === null || allocationFile === null) {
          res.status(404).send('File not found');
          return;
      }
      const allocation = await allocations.getAllocation(allocationId);
      if (allocation === null) {
          res.status(404).send('Allocation not found');
      }
      const userId = req.authenticatedUserId;
      let userIsInstructor = await allocations.checkUserIsInstructor(userId, allocationId);
      if (!userIsInstructor && !req.isAdmin) {
          res.status(403).send('User must be an allocation instructor or an admin');
          return;
      }
      await storage.deleteAllocationFile(fileName, fileId);
      const [files] = await allocations.getAllocationFiles(allocationId);
      if (files.children.length === 0) {
          const notSubmittedId = 1;
          await allocations.updateAllocationState(allocationId, notSubmittedId);
      }
      res.status(200).send();

  }  catch (err) {
      logger.getLogger().error(`Error in deleteAllocationFile(), storage.controller, ${err}`);
      res.status(500).send();
  }
};

exports.archive = async function (req, res) {
    try{
        const fileId = req.params.id;
        const file = await storage.getFileName(fileId);
        if (file === null) {
            res.status(404).send('File not found');
            return;
        }
        const lessonAllocationDetails = await (storage.getLessonAllocationDetails(fileId));
        const groupLastNames = await (storage.getGroupLastNames(lessonAllocationDetails.allocation_id));
        const groupName = `${lessonAllocationDetails.date.getFullYear()} (${groupLastNames.toString().replace(",", ", ")})`;

        let isInArchive = await storage.checkIfFileInArchive(fileId, lessonAllocationDetails.lesson_id, groupName);
        if (isInArchive) {
            res.status(406).send('File is already archived');
            return;
        }
        await storage.archive(fileId, lessonAllocationDetails.lesson_id, groupName);
        res.status(200).send('File archived');

    }  catch (err) {
        logger.getLogger().error(`Error in archive(), storage.controller, ${err}`);
        res.status(500).send();
    }
};

exports.getIsFileArchived = async function (req, res) {
    try {
        const fileId = req.params.id;
        const fileInArchive = await storage.getFileFromTable('archived_files', fileId);
        if (fileInArchive === null) {
            res.status(200).send({isArchived: false});
        } else {
            res.status(200).send({isArchived: true});
        }
    } catch (err) {
        logger.getLogger().error(`Error in getIsFileArchived(), storage.controller, ${err}`);
        res.status(500).send();
    }
}