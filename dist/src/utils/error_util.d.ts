declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
    serializeErrors(): {
        message: string;
    }[];
}
export declare class UserInputError extends CustomError {
    constructor(message: string);
}
export declare class NotFoundError extends CustomError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends CustomError {
    constructor(message?: string);
}
export declare class ForbiddenError extends CustomError {
    constructor(message?: string);
}
export declare class InternalServerError extends CustomError {
    constructor(message?: string);
}
export {};
//# sourceMappingURL=error_util.d.ts.map