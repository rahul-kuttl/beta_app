// In file_controller.ts
import { FileMeta } from "../models/file_meta_model";

interface FileData {
  userId: string;
  filename: string;
  url: string;
  size?: number;
  lastModified?: Date;
}

export const saveFileMetadata = async (fileData: FileData): Promise<void> => {
  try {
    const newFileMeta = new FileMeta({
      userId:fileData.userId,
      filename: fileData.filename,
      url: fileData.url,
      size: fileData.size,
      lastModified: fileData.lastModified,
      uploadDate: new Date(),
    });

    await newFileMeta.save();
    console.log(`Metadata for file ${fileData.filename} saved successfully.`);
  } catch (error) {
    console.error('Error saving file metadata:', error);
    // Handle the error here (e.g., log it, return a specific message, etc.)
    // Depending on how you want to handle errors, you might want to return an error message
    // or a specific response object here instead of just logging.
  }
};
