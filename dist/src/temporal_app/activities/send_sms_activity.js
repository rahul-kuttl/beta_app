"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSmsActivity = void 0;
const twilio_client_1 = __importDefault(require("../../integrations/twilio_client"));
async function sendSmsActivity(mobileNumber, otp) {
    const message = `Your OTP is: ${otp}`;
    await twilio_client_1.default.messages.create({
        body: message,
        to: mobileNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
    });
}
exports.sendSmsActivity = sendSmsActivity;
//# sourceMappingURL=send_sms_activity.js.map