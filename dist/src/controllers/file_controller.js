"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileMetadata = void 0;
// In file_controller.ts
const file_meta_model_1 = require("../models/file_meta_model");
const saveFileMetadata = async (fileData) => {
    try {
        const newFileMeta = new file_meta_model_1.FileMeta({
            userId: fileData.userId,
            filename: fileData.filename,
            url: fileData.url,
            size: fileData.size,
            lastModified: fileData.lastModified,
            uploadDate: new Date(),
        });
        await newFileMeta.save();
        console.log(`Metadata for file ${fileData.filename} saved successfully.`);
    }
    catch (error) {
        console.error('Error saving file metadata:', error);
        // Handle the error here (e.g., log it, return a specific message, etc.)
        // Depending on how you want to handle errors, you might want to return an error message
        // or a specific response object here instead of just logging.
    }
};
exports.saveFileMetadata = saveFileMetadata;
//# sourceMappingURL=file_controller.js.map