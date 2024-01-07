"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manage_account_route_1 = __importDefault(require("./manage_account_route"));
const profile_route_1 = __importDefault(require("./profile_route"));
const accountUserRouter = express_1.default.Router();
accountUserRouter.use('/profile', profile_route_1.default);
accountUserRouter.use('/manage', manage_account_route_1.default);
// Error handling middleware, placed after all routes
accountUserRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});
exports.default = accountUserRouter;
//# sourceMappingURL=account_route.js.map