// Base class for custom errors, extending the native JavaScript Error
class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
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
export class UserInputError extends CustomError {
  constructor(message: string) {
    super(message, 400); // HTTP status code 400 for Bad Request
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Error for handling cases where a resource is not found
export class NotFoundError extends CustomError {
  constructor(message: string = "Resource not found") {
    super(message, 404); // HTTP status code 404 for Not Found
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Error for unauthorized access attempts
export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized") {
    super(message, 401); // HTTP status code 401 for Unauthorized
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Error for forbidden actions, typically due to lack of permissions
export class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden") {
    super(message, 403); // HTTP status code 403 for Forbidden
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Error for internal server errors or unhandled exceptions
export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500); // HTTP status code 500 for Internal Server Error
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Additional custom error types can be added following the same pattern
