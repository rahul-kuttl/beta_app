"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user_model"));
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Access Denied: No token provided.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "hh");
        const user = await user_model_1.default.findOne({ _id: decoded?.id }).lean();
        if (!user) {
            return res.status(400).send("Invalid token.");
        }
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token.");
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=user_auth_middleware.js.map