const validation = require('../validation/allocations.validation');
const allocations = require('../models/allocations.models');
const users = require('../models/users.models');
const lessons = require('../models/lessons.models');
const logger = require("../../config/logger");

compoundKeyErrorMessage = function (user, period, date) {
    period = period === 'Both' ? 'one of the periods' : 'Period ' + period;
    let day = date.getDate().toString();
    day = day.length === 1 ? '0' + day : day;
    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;
    let year = date.getFullYear().toString().substring(2, 4)
    date = `${day}/${month}/${year}`;
    return `${user.first_name} ${user.last_name} already has a lesson during ${period} on ${date}`;
}

exports.allocate = async function (req, res) {
    // noinspection DuplicatedCode
    try {
        const data = req.body;
        const confirm = Boolean(req.query.confirm);
        data.date = new Date(data.date);
        const lesson = lessons.getLesson(data.lessonId);
        if (typeof lesson == 'undefined'){
            res.status(404).send("lesson not found");
            return;
        }
        if (!await validation.validateAllocation(data)) {
            res.status(400).send("Data types incorrect");
            return;
        }
        if (!await validation.validateAllocationUserIds(data.userIds)){
            res.status(404).send("User not found");
            return;
        }

        let allocationKeyTest = await validation.validateAllocationPrimaryKey(-1, data.userIds, data.period, data.date);
        if (!confirm && !allocationKeyTest.success){
            let failedUser = await users.getUserById(allocationKeyTest.userId);
            let message = compoundKeyErrorMessage(failedUser, data.period, data.date);
            res.status(409).send(message);
            return;
        }
        const allocationId = await allocations.createAllocation(data);
        res.status(200).send({allocationId: allocationId});

    } catch (err) {
        logger.getLogger().error(`Error in allocate(), allocations.controller, ${err}`);
        res.status(500).send("Unknown error");
    }
};

exports.deleteAllocation = async function (req, res){
    try{
        const allocationId = req.params.id;
        if (await allocations.getAllocation(allocationId)){
            await allocations.deleteAllocation(allocationId);
            res.status(200).send();
        } else {
            res.status(404).send("Allocation not found");
        }
    } catch (err) {
        logger.getLogger().error(`Error in deleteAllocation(), allocations.controller, ${err}`);
        res.storageApi(500).send();
    }
};

exports.getAllocationsForUser = async function (req, res){
    try{
        const userId = req.params.id;
        let showPast = req.query.showPast;
        let allocationsForUser;
        if (req.isAdmin || userId === req.authenticatedUserId) {
            allocationsForUser = await allocations.getAllocationsForUser(userId, showPast);
        } else {
            res.status(403).send();
            return;
        }
        if (allocationsForUser === undefined) {
            res.status(404).send("Allocations for user not found");
        } else {
            res.status(200).send(allocationsForUser);
        }
    } catch (err) {
        logger.getLogger().error(`Error in getAllocationsForUser(), allocations.controller, ${err}`);
        res.status(500).send();
    }
};

exports.getAllAllocations = async function (req, res) {
    try {
        let showPast = req.query.showPast;
        let allAllocations = await allocations.getAllAllocations(showPast);
        res.status(200).send(allAllocations);
    } catch (err) {
        logger.getLogger().error(`Error in getAllAllocations(), allocations.controller, ${err}`);
        res.status(500).send();
    }
};

exports.getOneAllocation = async function (req, res) {
    try {
        const allocationId = req.params.id;
        let allocation = await allocations.getOneAllocation(allocationId);
        if (allocation === null) {
            res.status(404).send("Allocation not found");
        } else {
            res.status(200).send(allocation);
        }
    } catch (err) {
        logger.getLogger().error(`Error in getOneAllocation(), allocations.controller, ${err}`);
        res.status(500).send("Database error");
    }
}

exports.patchAllocation = async function (req, res){
    try{
        const allocationId = req.params.id;
        const confirm = Boolean(req.query.confirm);
        const data = req.body;
        data.date = new Date(data.date);
        if (!await validation.validateAllocation(data)) { //checks data has valid syntax
            res.status(400).send("Allocation not valid");
            return;
        }
        let allocation = await allocations.getAllocation(allocationId);
        if (allocation === null){ //checks allocation exists
            res.status(404).send("Allocation not found");
            return;
        }
        if (!await validation.validateAllocationUserIds(data.userIds)){
            res.status(404).send("User not found");
            return;
        }
        // check if users, date and period are unchanged, if so we do not need to detect clashes
        let allocationKeyChanged = !validation.allocationKeyUnchanged(allocation, data);
        if (!confirm && allocationKeyChanged) {

            // if user, date or period have changed we need to check for clashes
            let allocationKeyTest = await validation.validateAllocationPrimaryKey(allocationId, data.userIds, data.period, data.date);
            if (!allocationKeyTest.success){

                let failedUser = await users.getUserById(allocationKeyTest.userId);
                let message = compoundKeyErrorMessage(failedUser, data.period, data.date);
                res.status(409).send(message);
                return;
            }
        }

        await allocations.patchAllocation(allocationId, data, allocationKeyChanged); // commit the patch
        res.status(200).send();

    } catch (err) {
        logger.getLogger().error(`Error in patchAllocation(), allocations.controller, ${err}`);
        res.status(500).send();
    }
};

exports.updateAllocationState = async function (req, res) {
    try {
        const allocationId = req.params.id;
        const state = req.body.state;
        const newStateId = await allocations.getStateIdFromName(state);

        if (newStateId === null) {
            res.status(400).send("Invalid new state");
            return;
        }
        if (await allocations.getAllocation(allocationId) === null) {
            res.status(404).send("Allocation not found");
            return;
        }
        await allocations.updateAllocationState(allocationId, newStateId);
        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in updateAllocationState(), allocations.controller, ${err}`);
        res.status(500).send();
    }
};

exports.getAllocationFiles = async function (req, res) {
    try {
        const allocationId = req.params.id;
        let allocation = await allocations.getAllocation(allocationId);
        if (allocation === null) { //checks allocation exists
            res.status(404).send("Allocation not found");
            return;
        }
        const fileData = await allocations.getAllocationFiles(allocationId);
        res.status(200).send(fileData);
    } catch (err) {
        logger.getLogger().error(`Error in getAllocationFiles(), allocations.controller, ${err}`);
      res.status(500).send();
    }
};

exports.updateFeedback = async function (req, res) {
    try {
        const allocationId = req.params.id;
        const feedback = req.body.feedback;
        if (!validation.validateFeedback(feedback)) {
            res.status(400).send("Feedback must be 1024 characters or less");
            return;
        }
        if (await allocations.getAllocation(allocationId) === null) {
            res.status(404).send("Allocation not found");
            return;
        }
        await allocations.updateAllocationFeedback(allocationId, feedback);
        res.status(200).send();
    } catch (err) {
        logger.getLogger().error(`Error in updateFeedback(), allocations.controller, ${err}`);
        res.status(500).send();
    }
}

