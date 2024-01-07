import { Client } from 'minio';
import config from '../../config/config';

const minioClient = new Client({
  endPoint: config.s3Config.s3_endpoint,
  useSSL: config.minioConfig.useSSL,
  accessKey: config.s3Config.accessKeyId,
  secretKey: config.s3Config.secretAccessKey,
  region: 'ap-south-1',
});

export const generatePresignedUrl = async (
  bucketName: string = 'alpha-file-storage',
  fileKey: string,
  expires = 60,
): Promise<string> => {
  try {
    const presignedUrl = await minioClient.presignedPutObject(
      bucketName,
      fileKey,
      expires,
    );
    console.log(`Pre-signed URL generated: ${presignedUrl}`);
    return presignedUrl;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    throw error;
  }
};

export const uploadFileToS3 = async (
  fileContent: Buffer,
  fileName: string,
  bucketName = 'alpha-file-storage',
): Promise<any> => {
  try {
    await minioClient.putObject(bucketName, fileName, fileContent);
    const fileUrl = `${config.minioConfig.useSSL ? 'https' : 'http'}://${
      config.s3Config.s3_endpoint
    }/${bucketName}/${fileName}`;

    const metadata = {
      url: fileUrl,
      size: fileContent.length,
      lastModified: new Date(),
    };
    return metadata;
  } catch (error) {
    console.error('Error uploading to Minio:', error);
    throw error;
  }
};
