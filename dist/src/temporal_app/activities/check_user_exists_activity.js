"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExistsActivity = void 0;
const user_model_1 = __importDefault(require("../../models/user_model"));
async function checkUserExistsActivity(mobileNumber) {
    try {
        const user = await user_model_1.default.findOne({
            mobileNumber: `${mobileNumber}`,
        }).lean();
        return user;
    }
    catch (error) {
        throw new Error("Error checking if user exists: " + error);
    }
}
exports.checkUserExistsActivity = checkUserExistsActivity;
//# sourceMappingURL=check_user_exists_activity.js.map