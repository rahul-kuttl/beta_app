import { Request, Response } from 'express';
import { saveFileMetadata } from '../controllers/file_controller';

//route to handle file meta data storage in mongoDB
export async function handleUploadConfirmation(req: Request, res: Response) {
    try {
        const { userId,fileName, fileSize, fileUrl, lastModified } = req.body;

        // Save metadata to MongoDB
        await saveFileMetadata({
            userId,
            filename: fileName,
            url: fileUrl,
            size: fileSize,
            lastModified: new Date(lastModified)
        });

        res.status(200).json({ message: 'File uploaded and metadata saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
