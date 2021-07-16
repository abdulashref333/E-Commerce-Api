class BaseError extends Error {
    constructor(name, statuscode, isOperational, description){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statuscode = statuscode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this); 
    }
}


module.exports = BaseError;