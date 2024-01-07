"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../../controllers/user_controller");
const profileRouter = express_1.default.Router();
// Get user details
profileRouter.get('/:userId', async (req, res) => {
    try {
        const userDetails = await (0, user_controller_1.getUserDetails)(req.params.userId);
        res.status(200).json(userDetails);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
// Error handling middleware, placed after all routes
profileRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User/Account_API: Internal Server Error' }); // Send JSON response
});
exports.default = profileRouter;
//# sourceMappingURL=profile_route.js.map