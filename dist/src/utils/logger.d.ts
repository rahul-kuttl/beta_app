import * as winston from 'winston';
interface LoggerOptions {
    level: string;
    format: winston.Logform.Format;
    transports: winston.transport[];
}
export declare const initLogger: (options: LoggerOptions) => winston.Logger;
declare const Logger: winston.Logger;
export default Logger;
//# sourceMappingURL=logger.d.ts.map