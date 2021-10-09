const db = require('../../config/db');
const path = require('path');
const fs = require('mz/fs');


exports.uploadToArchive = async function (fileContents, contentType, fileName, group, lessonId) {

    const submissionsSQL = "INSERT INTO `file_submissions` (`filename`) VALUES (?);";
    const fileId = (await db.getPool().query(submissionsSQL, [fileName]))[0].insertId;

    const archiveSQL = "INSERT INTO archived_files (lesson_id, file_id, `group`) VALUES (?, ?, ?);";
    await db.getPool().query(archiveSQL, [lessonId, fileId, group])

    let storedFileName = `${fileId}-${fileName}`;

    let root = path.dirname(require.main.filename)
    let filePath = path.join(root +'/storage/', storedFileName);
    fs.writeFileSync(filePath, fileContents);

    return fileId;
};

exports.uploadToAllocation = async function (fileContents, contentType, fileName, allocationId) {
    const submissionsSQL = "INSERT INTO `file_submissions` (`filename`) VALUES (?);";
    const fileId = (await db.getPool().query(submissionsSQL, [fileName]))[0].insertId;

    const allocationSQL = "INSERT INTO allocation_files (allocation_id, file_id) VALUES (?, ?);";
    await db.getPool().query(allocationSQL, [allocationId, fileId]);

    let storedFileName = `${fileId}-${fileName}`;

    let root = path.dirname(require.main.filename)
    let filePath = path.join(root +'/storage/', storedFileName);
    fs.writeFileSync(filePath, fileContents);

    return fileId;
}


getMimeType = function (filename) {
    if (filename.endsWith('.doc')) return 'application/msword';
    if (filename.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
    if (filename.endsWith('.pdf')) return 'application/pdf';
    if (filename.endsWith('.ppt')) return 'application/vnd.ms-powerpoint';
    if (filename.endsWith('.pptx')) return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
}

/**
 * Retrieve a file
 * @returns {Promise<null|{file: *, mimeType: string}>}
 * @param fileName
 */
exports.retrieveFile = async function (fileName) {

    const fileDirectory = './storage/';
    if (await fs.exists(fileDirectory + fileName)) {
        const file = await fs.readFile(fileDirectory + fileName);
        const mimeType = getMimeType(fileName);
        return {file:file, mimeType:mimeType};
    } else {
        return null;
    }
};

/**
 * Gets the file name (in the format ID + filename)
 * @param fileId
 * @returns Promise<string|null>
 */
exports.getFileName = async function (fileId) {
    const selectSQL = 'SELECT `filename` FROM `file_submissions` WHERE `id` = ?';
    const result = await db.getPool().query(selectSQL, [fileId]);
    const fileName = result[0];
    if (fileName.length > 0) {
        return fileId + '-' + fileName[0].filename;
    }
    return null;
};


/**
 * Used to check if a given file ID is in the allocation_files table.
 * @param fileId
 * @returns Promise<string|null>
 */
exports.getFileFromTable = async function (table, fileId) {
    const selectSQL = `SELECT * FROM ${table} WHERE file_id = ?`;
    const [files] = await db.getPool().query(selectSQL, [fileId]);
    if (files.length) {
        return files[0]
    }
    return null;
};

/**
 * Deletes a stored file and any related database rows in file_submissions, allocation_files, archived_files.
 * @param filename the name of the file (not including the file ID)
 * @param fileId the ID of the file to be deleted
 * @returns {Promise<void>}
 */
exports.deleteFile = async function (filename, fileId) {
    const fileDirectory = './storage/';
    const filePath = fileDirectory + filename;
    if (await fs.exists(filePath)) {
        fs.unlinkSync(filePath);
    }
    const deleteSQL = 'DELETE FROM file_submissions where id = ?'; // this will cascade and delete related entries in allocation_files and archived_files
    await db.getPool().query(deleteSQL, [fileId]);
};


/**
 * Checks if a file is used in a current allocation. If it is, then it will remove the row in the archived_files table but
 * won't delete the file. Otherwise, it will delete the file and the database row.
 * @param filename
 * @param fileId
 * @returns {Promise<void>}
 */
exports.deleteArchivedFile = async function (filename, fileId) {
    let checkSql = "SELECT * FROM allocation_files WHERE file_id = ?";
    let [res] = await db.getPool().query(checkSql, [fileId]);
    if (res.length > 0) {
        const deleteSql = "DELETE FROM archived_files WHERE file_id = ?";
        await db.getPool().query(deleteSql, [fileId]);
    } else {
        await this.deleteFile(filename, fileId);
    }

};


/**
 * Checks if a file is archived. If it is, it will delete the row in the allocation_files table, but won't delete
 * the file. Otherwise it will delete the row and the file itself.
 * @param filename
 * @param fileId
 * @returns {Promise<void>}
 */
exports.deleteAllocationFile = async function (filename, fileId) {
    let checkSql = "SELECT * FROM archived_files WHERE file_id = ?";
    let res = (await db.getPool().query(checkSql, [fileId]))[0];
    let deleteSql;
    if (res.length > 0) {
        deleteSql = "DELETE FROM allocation_files WHERE file_id = ?";
        await db.getPool().query(deleteSql, [fileId]);
    } else {
        await this.deleteFile(filename, fileId)
    }
}

/**
 * Get the lesson id and allocation date
 * @param fileId of file to get
 * @returns {Promise<string|null>}
 */
exports.getLessonAllocationDetails = async function (fileId) {
    const selectSQL = 'SELECT lesson_id, date, allocation_id FROM allocation_files af JOIN lesson_allocations la on la.id = af.allocation_id WHERE file_id = ?';
    const result = await db.getPool().query(selectSQL, [fileId]);
    return result[0][0];
};

/**
 * Get last names of all instructors for an allocation
 * @param allocationId to get users of
 * @returns {Promise<*>}
 */
exports.getGroupLastNames = async function (allocationId) {
    const selectSQL = 'SELECT last_name FROM allocated_instructors ai JOIN users u on u.id = ai.instructor_id WHERE allocation_id = ?';
    const result = await db.getPool().query(selectSQL, [allocationId]);
    let names = [];
    for (let row of result[0]) {
        names.push(row.last_name)
    }
    return names;
};

/**
 * Insert a new row into archived_files. The file itself is unchanged
 * @param fileId of file to archive
 * @param lessonId of lesson to archive to
 * @param groupName relating to the allocation from which the files came
 * @returns {Promise<void>}
 */
exports.archive = async function (fileId, lessonId, groupName) {
    const insertSQL = 'INSERT INTO archived_files (lesson_id, file_id, `group`) VALUES (?, ?, ?)';
    await db.getPool().query(insertSQL, [lessonId, fileId, groupName]);
};

/**
 * Checks if the tuple (fileId, lessonId, groupName) is already in archived_files
 * @param fileId of file to archive
 * @param lessonId of lesson to archive to
 * @param groupName relating to the allocation from which the files came
 * @returns {Promise<boolean>} true if file is already archived
 */
exports.checkIfFileInArchive = async function (fileId, lessonId, groupName) {
    const selectSQL = 'SELECT * FROM archived_files WHERE file_id = ? AND lesson_id = ? AND `group` = ?';
    const result = (await db.getPool().query(selectSQL, [fileId, lessonId, groupName]))[0]
    return result.length >= 1;
}