"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("../config/config"));
const twilioClient = (0, twilio_1.default)(config_1.default.twilioConfig.accountSid, config_1.default.twilioConfig.authToken);
exports.default = twilioClient;
//# sourceMappingURL=twilio_client.js.map