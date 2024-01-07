"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_auth_route_1 = __importDefault(require("./user_auth_route"));
const authenticationRouter = express_1.default.Router();
authenticationRouter.use('/user', user_auth_route_1.default);
// Error handling middleware, placed after all routes
authenticationRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'Platform_Service: Internal Server Error' }); // Send JSON response
});
exports.default = authenticationRouter;
//# sourceMappingURL=authentication_route.js.map