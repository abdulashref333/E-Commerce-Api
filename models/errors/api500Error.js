const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class Api500Error extends BaseError{
    constructor(
        name, 
        statuscode = httpStatusCodes.INTERNAL_SERVER,
        isOperational = true,
        description = 'INTERNAL SERVER ERROR'
    ){
        super(name, statuscode, isOperational, description);
    }
}

module.exports = Api500Error;