"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_contoller_1 = require("../../../controllers/auth_contoller");
const userAuthRouter = express_1.default.Router();
// Route for user login
userAuthRouter.post('/login', auth_contoller_1.loginController);
exports.default = userAuthRouter;
//# sourceMappingURL=user_auth_route.js.map