import {
    Exception,
    GenericException,
    InvalidInputException,
} from '@ovl-nimbus/core';

export const handleMongoError = (error: any): Exception => {
    if (error.code && error.code === 121) {
        return new InvalidInputException(error.message, {
            code: error.code,
            ...(error.errInfo?.['details'] && {
                details: error.errInfo?.['details'],
            }),
            ...(error.writeErrors && { writeErrors: error.writeErrors }),
            ...(error.result && { result: error.result }),
        }).fromError(error);
    } else if (error.code && error.code === 2) {
        return new InvalidInputException().fromError(error);
    } else if (error.code && error.code === 11000) {
        return new InvalidInputException(error.message, {
            keyValue: error['keyValue'],
        }).fromError(error);
    } else {
        return new GenericException().fromError(error);
    }
};
