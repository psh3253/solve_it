const util = {};

/** 
 * @function getDateString
 * @param {String} datetime MySQL datetime format
 * @returns {String} "YYYY-MM-DD hh:mm:ss" datetime format
 */

util.getDateString = function getDateString(datetime) {
    const today = new Date(datetime);
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}


/**
 * @function normalResponse
 * @param {Number} code HTTP status code
 * @param {String} message success or error message
 * @param {Boolean} success true if request execute sucessfully
 * @returns {Object} {code, message, success}
 */

util.normalResponse = (code, message, success) => {
    return {
        code: code,
        message: message,
        success: success
    }
}

module.exports = util;