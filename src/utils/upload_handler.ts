import { Request, Response } from 'express';
import { saveFileMetadata } from '../controllers/file_controller';

interface UploadConfirmationRequest extends Request {
    body: {
        fileName: string;
        fileSize: number;
        fileUrl: string;
        lastModified: Date;
    };
}

export async function handleUploadConfirmation(req: UploadConfirmationRequest, res: Response) {
    const { fileName, fileSize, fileUrl, lastModified } = req.body;

    try {
        // Save metadata to MongoDB
        await saveFileMetadata({
            filename: fileName,
            url: fileUrl,
            size: fileSize,
            lastModified: lastModified
        });

        res.status(200).json({ message: 'File metadata saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
