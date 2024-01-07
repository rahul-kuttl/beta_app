"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_router_1 = __importDefault(require("./purchase/purchase_router"));
const line_items_router_1 = __importDefault(require("./purchase/line_items_router"));
const account_route_1 = __importDefault(require("./account/account_route"));
const secure_vault_route_1 = __importDefault(require("./secure-vault/secure_vault_route"));
const userRouter = express_1.default.Router();
// Middleware for authenticating subsequent routes
//app.use(authenticate); // Applies to all subsequent routes
// Purchase related actions
userRouter.use('/purchase', purchase_router_1.default);
userRouter.use('/account', account_route_1.default);
userRouter.use('/secure-vault', secure_vault_route_1.default);
// Line item related actions
userRouter.use('/item', line_items_router_1.default);
// Error handling middleware, placed after all routes
userRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});
exports.default = userRouter;
//# sourceMappingURL=user_route.js.map