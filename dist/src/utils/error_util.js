"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.UserInputError = void 0;
// Base class for custom errors, extending the native JavaScript Error
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Initialize the Error parent class
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Ensure the prototype chain is correct
    }
    // Method to format the error for responses or logging
    serializeErrors() {
        return [{ message: this.message }];
    }
}
// Error for handling validation and user input related issues
class UserInputError extends CustomError {
    constructor(message) {
        super(message, 400); // HTTP status code 400 for Bad Request
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UserInputError = UserInputError;
// Error for handling cases where a resource is not found
class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
        super(message, 404); // HTTP status code 404 for Not Found
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotFoundError = NotFoundError;
// Error for unauthorized access attempts
class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized") {
        super(message, 401); // HTTP status code 401 for Unauthorized
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// Error for forbidden actions, typically due to lack of permissions
class ForbiddenError extends CustomError {
    constructor(message = "Forbidden") {
        super(message, 403); // HTTP status code 403 for Forbidden
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
// Error for internal server errors or unhandled exceptions
class InternalServerError extends CustomError {
    constructor(message = "Internal Server Error") {
        super(message, 500); // HTTP status code 500 for Internal Server Error
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.InternalServerError = InternalServerError;
// Additional custom error types can be added following the same pattern
//# sourceMappingURL=error_util.js.map