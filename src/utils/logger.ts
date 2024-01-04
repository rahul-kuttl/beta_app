// utils/logger.ts
import * as winston from 'winston';

// Define an interface for the Logger options
interface LoggerOptions {
    level: string;
    format: winston.Logform.Format;
    transports: winston.transport[];
}

// Create a function to initialize the Logger
export const initLogger = (options: LoggerOptions): winston.Logger => {
    return winston.createLogger(options);
};

// Define the default configuration for the Logger
const loggerOptions: LoggerOptions = {
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        // Add other transports as needed, like File, HTTP, etc.
    ],
};

// Initialize the Logger with the default configuration
const Logger = initLogger(loggerOptions);

export default Logger;
