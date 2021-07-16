const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class Api404Error extends BaseError{
    constructor(
        name, 
        statuscode = httpStatusCodes.NOT_FOUND,
        isOperational = true,
        description = 'Not Found.'
    ){
            super(name, statuscode, isOperational, description);
    }
}

module.exports = Api404Error;