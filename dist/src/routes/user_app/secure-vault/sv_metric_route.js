"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const svMetricRouter = express_1.default.Router();
// Get details of the media (read metadata) and retrieve all files of an User
svMetricRouter.get('/global', async (req, res) => {
    res.json({ message: '' });
});
// ToDo As user won't be able to edit, these are aggregated system generated data
// Intead this should come under manage route
exports.default = svMetricRouter;
//# sourceMappingURL=sv_metric_route.js.map