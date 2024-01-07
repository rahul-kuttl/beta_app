/// <reference types="node" />
export declare const generatePresignedUrl: (bucketName: string | undefined, fileKey: string, expires?: number) => Promise<string>;
export declare const uploadFileToS3: (fileContent: Buffer, fileName: string, bucketName?: string) => Promise<any>;
//# sourceMappingURL=s3_upload.d.ts.map