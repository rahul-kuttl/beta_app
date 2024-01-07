"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = require("../../../controllers/purchase_controller");
const upload_handler_1 = require("../../../utils/upload_handler");
const manageSecureVaultRouter = express_1.default.Router();
// File upload route
//app.post('/upload', upload.single('file'), handleFileUpload); // Ensure multer processes the file upload
manageSecureVaultRouter.get('/pre-signed-url', purchase_controller_1.getPresignedUrlForUpload);
/*
need to setup limit on fileSize on backend
*/
manageSecureVaultRouter.post('/upload-confirmation', upload_handler_1.handleUploadConfirmation);
// Delete all media for a user
manageSecureVaultRouter.delete('/permanently-delete', async (req, res) => {
    try {
        // Logic to delete all media for the provided user
        // Implement your logic here
        res.json({ success: true, message: 'All media deleted for the user' });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: 'Error deleting all media', error: error.message });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error deleting all media',
                error: 'Unknown error',
            });
        }
    }
});
manageSecureVaultRouter.post('/archive', (req, res, next) => {
    res.json('Archived for 6months permanently deletion window');
});
manageSecureVaultRouter.post('/clear-activity-log-with-options', (req, res, next) => {
    res.json('Archived for 6months permanently deletion window');
});
manageSecureVaultRouter.post('/metric/global', (req, res, next) => {
    res.json('Saved aggregate');
});
// Error handling middleware, placed after all routes
manageSecureVaultRouter.use((err, req, res, next) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});
exports.default = manageSecureVaultRouter;
//# sourceMappingURL=manage_sv_route.js.map