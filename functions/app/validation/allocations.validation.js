const allocations = require( "../models/allocations.models");
const validation = require('./common.validation');
const users = require('../models/users.models');

exports.validateAllocation = async function (allocation) {
    if (allocation.lessonPlanRequired === undefined) {
        return false;
    } if (!validation.isPositiveInteger(allocation.lessonId)) {
        return false;
    } if (!validation.isValidRequiredString(allocation.yearGroup)) {
        return false;
    } if (!validation.isValidRequiredString(allocation.period)) {
        return false;
    } if (!validation.isValidRequiredDate(allocation.date)) {
        return false;
    }

    return true;
};

exports.validateAllocationUserIds = async function(userIds) {
    if (userIds === undefined || userIds === null || typeof userIds[Symbol.iterator] !== 'function') {
        return false;
    }
    for (let userId of userIds) {
        let user = await users.getUserById(userId);
        if (user === undefined) {
            return false;
        }
    }
    return true;
}

exports.validateAllocationPrimaryKey = async function (allocationId, userIds, period, date) {
    for (let userId of userIds) {
        if (await allocations.compoundKeyInAllocations(allocationId, userId, period, date)){
            return {success: false, userId: userId};
        }
    }
    return {success: true};
}

exports.allocationKeyUnchanged = function (currentAllocation, updatedAllocation) {
    if (currentAllocation.instructorIds.length !== updatedAllocation.userIds.length) {
        return false;
    }
    for (let i = 0; i < updatedAllocation.userIds.length; i++) {
        if (currentAllocation.instructorIds[i] !== updatedAllocation.userIds[i]) {
            return false;
        }
    }
    if (currentAllocation.period !== updatedAllocation.period) {
        return false;
    }
    if (currentAllocation.date.getTime() !== updatedAllocation.date.getTime()) {
        return false;
    }
    return true;
}

exports.validateFeedback = function (feedback) {
    return feedback.length <= 1024;
}