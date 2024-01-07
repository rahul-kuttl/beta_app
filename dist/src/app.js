"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
//import multer from 'multer';
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
// import router from './routes/userDetailRoute.js'; // Original code, JS file import commented out
const user_route_1 = __importDefault(require("./routes/user_app/user_route"));
const platform_route_1 = __importDefault(require("./routes/platform/platform_route"));
const app = (0, express_1.default)();
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.default.mongodb.dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Parsing JSON and URL-encoded data in the request body
app.use((0, express_1.json)({ limit: '5mb' }));
app.use((0, express_1.urlencoded)({ limit: '5mb', extended: true }));
// Open Routes
app.get('/health-check', (req, res) => {
    res.json({ message: 'Hello world' }); // Changed to send JSON object for consistency
});
// Contains Authentication route
app.use('/platform', platform_route_1.default);
// Registered user related actions
app.use('/user', user_route_1.default);
// Error handling middleware, placed after all routes
app.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'Internal Server Error' }); // Send JSON response
});
// Starting the server
const port = config_1.default.serverConfig.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Template literal for dynamic port
});
//# sourceMappingURL=app.js.map