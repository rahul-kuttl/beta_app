"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomOtp = void 0;
// api_server/utils/otp_utils.ts
// use crypto package to generate instead of this - make sure there is no sode effects
function generateRandomOtp(length = 6) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
}
exports.generateRandomOtp = generateRandomOtp;
//# sourceMappingURL=otp_util.js.map