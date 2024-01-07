"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpActivity = void 0;
const crypto_1 = __importDefault(require("crypto"));
async function generateOtpActivity() {
    let otp = "";
    while (otp.length < 6) {
        // Generate a random byte
        const randomByte = crypto_1.default.randomBytes(1).readUInt8(0);
        // Convert the byte to a number in the 0-9 range
        const digit = randomByte % 10;
        otp += digit.toString();
    }
    return otp;
}
exports.generateOtpActivity = generateOtpActivity;
//# sourceMappingURL=generate_otp_activity.js.map