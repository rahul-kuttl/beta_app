"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
// these kind of function shouldn't be in global scope,
// should always be accessed via verification
// Function to get user details
async function getUserDetails(userId) {
    const user = await user_model_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    return user;
}
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=user_controller.js.map