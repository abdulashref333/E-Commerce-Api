const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class Api401Error extends BaseError{
    constructor(
        name, 
        statuscode = httpStatusCodes.UNAUTHORIZED_USER,
        isOperational = true,
        description = 'Unauthorized User.'
    ){
        super(name, statuscode, isOperational, description);
    }
}

module.exports = Api401Error;