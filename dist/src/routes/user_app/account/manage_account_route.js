"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manageUserAccountRouter = express_1.default.Router();
// Delete all media for a user
manageUserAccountRouter.delete('/permanently-delete', async (req, res) => {
    res.json({ message: 'sksk' });
});
manageUserAccountRouter.post('/archive', (req, res, next) => {
    res.json('Archived for 6months permanently deletion window');
});
// Error handling middleware, placed after all routes
manageUserAccountRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});
exports.default = manageUserAccountRouter;
//# sourceMappingURL=manage_account_route.js.map