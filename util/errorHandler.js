const logger = require('../log/logger');
const BaseError = require('../models/errors/baseError');

function logError(err) {
    logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}

function returnError(err, req, res, next) {
    res.status(err.statusCode || 500).send(JSON.stringify({error: err.message}));
}

function isOperationalError(error) {
    if(error instanceof BaseError){
        return error.isOperational;
    }
    return false;
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError
}