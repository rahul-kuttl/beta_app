"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
// api_server/validators/login_validator.ts
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    mobile_number: joi_1.default.string().required(),
    dial_code: joi_1.default.string().required(),
    otp: joi_1.default.string(),
});
//# sourceMappingURL=login_validator.js.map