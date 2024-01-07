"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../../../services/database_service");
const file_service_1 = require("../../../services/file_service");
const dbService = new database_service_1.DatabaseService(); //database service instantiation
const fileService = new file_service_1.FileService(); //file handling service instantiation
const svMediaRouter = express_1.default.Router();
// Get details of the media (read metadata) and retrieve all files of an User
svMediaRouter.get('/:mediaId', async (req, res) => {
    const mediaId = req.params.mediaId;
    if (!mediaId) {
        return res
            .status(400)
            .json({ error: 'Bad Request', message: 'Media ID is required' });
    }
    try {
        // Fetch metadata from the database
        const metadata = await dbService.getMetadata(mediaId);
        res.json({ message: 'Metadata retrieved', data: metadata });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error fetching metadata',
                details: error.message,
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error fetching metadata',
                details: 'Unknown error',
            });
        }
    }
});
// Update the filename or replace the uploaded file
svMediaRouter.put('/:mediaId', async (req, res) => {
    try {
        // Update filename or file content in the database or storage
        const updateResult = await fileService.updateFile(req.params.mediaId, req.body);
        res.json({ message: 'File updated', result: updateResult });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error updating file',
                details: error.message,
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error updating file',
                details: 'Unknown error',
            });
        }
    }
});
// Remove the media and metadata linked to it
svMediaRouter.delete('/:mediaId', async (req, res) => {
    try {
        // Delete the object and its metadata from the database or storage
        await fileService.deleteFile(req.params.mediaId);
        res.json({ message: 'File deleted' });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error deleting file',
                details: error.message,
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error deleting file',
                details: 'Unknown error',
            });
        }
    }
});
exports.default = svMediaRouter;
//# sourceMappingURL=sv_media_route.js.map