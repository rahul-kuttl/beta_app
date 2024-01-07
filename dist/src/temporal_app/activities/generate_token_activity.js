"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenActivity = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function generateTokenActivity(userId) {
    try {
        return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || "kk", {
            expiresIn: "7d",
        });
    }
    catch (error) {
        throw new Error("Error creating new token: " + error);
    }
}
exports.generateTokenActivity = generateTokenActivity;
//# sourceMappingURL=generate_token_activity.js.map