"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = exports.generatePresignedUrl = void 0;
const minio_1 = require("minio");
const config_1 = __importDefault(require("../config/config"));
const minioClient = new minio_1.Client({
    endPoint: config_1.default.s3Config.s3_endpoint,
    useSSL: config_1.default.minioConfig.useSSL,
    accessKey: config_1.default.s3Config.accessKeyId,
    secretKey: config_1.default.s3Config.secretAccessKey,
    region: 'ap-south-1'
});
const generatePresignedUrl = async (bucketName = 'alpha-file-storage', fileKey, expires = 60) => {
    try {
        const presignedUrl = await minioClient.presignedPutObject(bucketName, fileKey, expires);
        console.log(`Pre-signed URL generated: ${presignedUrl}`);
        return presignedUrl;
    }
    catch (error) {
        console.error('Error generating pre-signed URL:', error);
        throw error;
    }
};
exports.generatePresignedUrl = generatePresignedUrl;
const uploadFileToS3 = async (fileContent, fileName, bucketName = 'alpha-file-storage') => {
    try {
        await minioClient.putObject(bucketName, fileName, fileContent);
        const fileUrl = `${config_1.default.minioConfig.useSSL ? 'https' : 'http'}://${config_1.default.s3Config.s3_endpoint}/${bucketName}/${fileName}`;
        const metadata = {
            url: fileUrl,
            size: fileContent.length,
            lastModified: new Date(),
        };
        return metadata;
    }
    catch (error) {
        console.error('Error uploading to Minio:', error);
        throw error;
    }
};
exports.uploadFileToS3 = uploadFileToS3;
//# sourceMappingURL=s3_upload.js.map