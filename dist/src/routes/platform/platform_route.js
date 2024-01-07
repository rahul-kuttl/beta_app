"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_route_1 = __importDefault(require("./authentication/authentication_route"));
const platformRouter = express_1.default.Router();
platformRouter.use('/authentication', authentication_route_1.default);
// Error handling middleware, placed after all routes
platformRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'Platform_Service: Internal Server Error' }); // Send JSON response
});
exports.default = platformRouter;
//# sourceMappingURL=platform_route.js.map