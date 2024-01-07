"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadConfirmation = void 0;
const file_controller_1 = require("../controllers/file_controller");
//route to handle file meta data storage in mongoDB
async function handleUploadConfirmation(req, res) {
    try {
        const { userId, fileName, fileSize, fileUrl, lastModified } = req.body;
        // Save metadata to MongoDB
        await (0, file_controller_1.saveFileMetadata)({
            userId,
            filename: fileName,
            url: fileUrl,
            size: fileSize,
            lastModified: new Date(lastModified)
        });
        res.status(200).json({ message: 'File uploaded and metadata saved successfully' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.handleUploadConfirmation = handleUploadConfirmation;
//# sourceMappingURL=upload_handler.js.map