"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUserActivity = void 0;
const user_model_1 = __importDefault(require("../../models/user_model"));
async function createNewUserActivity(mobileNumber) {
    try {
        const newUser = new user_model_1.default({
            mobileNumber: `${mobileNumber}`,
            appOnboarding: { isComplete: false },
        });
        await newUser.save();
        const user = await user_model_1.default.findOne({
            mobileNumber: `${mobileNumber}`,
        }).lean();
        console.log("New user created:", user);
        return user;
    }
    catch (error) {
        throw new Error("Error creating new user: " + error);
    }
}
exports.createNewUserActivity = createNewUserActivity;
//# sourceMappingURL=create_new_user_activity.js.map