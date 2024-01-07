"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const twilio_client_1 = __importDefault(require("../integrations/twilio_client"));
async function sendSms(to, body) {
    try {
        const message = await twilio_client_1.default.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return message.sid;
    }
    catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
}
exports.sendSms = sendSms;
//# sourceMappingURL=sms_service.js.map