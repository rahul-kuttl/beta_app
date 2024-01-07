/// <reference types="multer" />
import { ParsedQs } from 'qs';
type UploadResult = {
    url: string;
    filename: string;
};
export declare class FileService {
    searchFiles(query: ParsedQs): void;
    deleteFile(mediaId: string | undefined): void;
    updateFile(mediaId: string | undefined, body: any): void;
    uploadFile(userId: string, file: Express.Multer.File): Promise<UploadResult>;
}
export {};
//# sourceMappingURL=file_service.d.ts.map