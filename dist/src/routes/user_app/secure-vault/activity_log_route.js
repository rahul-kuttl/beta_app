"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../../../services/database_service");
const dbService = new database_service_1.DatabaseService(); //database service instantiation
const activityLogRouter = express_1.default.Router();
// Get details of the media (read metadata) and retrieve all files of an User
activityLogRouter.get('/global', async (req, res) => {
    try {
        const activityLog = await dbService.getActivityLog(req.params.userId);
        res.json({ message: 'Activity log retrieved', data: activityLog });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error retrieving activity log',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error retrieving activity log',
                error: 'Unknown error',
            });
        }
    }
});
// Create activity log route shouldn't be here as it is read only for user.
// they can only clear up (via manage) not edit or add themshelves.
exports.default = activityLogRouter;
//# sourceMappingURL=activity_log_route.js.map