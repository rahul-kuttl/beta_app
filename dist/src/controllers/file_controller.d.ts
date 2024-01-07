interface FileData {
    userId: string;
    filename: string;
    url: string;
    size?: number;
    lastModified?: Date;
}
export declare const saveFileMetadata: (fileData: FileData) => Promise<void>;
export {};
//# sourceMappingURL=file_controller.d.ts.map