import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import path from 'path';

const rootDir = path.join(__dirname, '..');

interface MongoDBConfig {
  dbURI: string;
  dbName: string;
}

interface Config {
  mongodb: MongoDBConfig;
  jwtSecret: string;
  serverConfig: {
    port: number;
  };
  twilioConfig: {
    accountSid: string;
    authToken: string;
    fromNumber: string;
  };
  s3Config: {
    accessKeyId: string;
    secretAccessKey: string;
    s3_endpoint: string;
    region: string;
  };
  minioConfig: {
    endPoint: string;
    useSSL: boolean;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
    port: number;
  };
  jwtSecretExpiry: number;
  temporalUserTaskQueue: string;
  temporalCloudAddress: string;
  temporalNamespace: string;
  temporalCertificatesBasePath: string;
}

const parsePort = (
  portValue: string | undefined,
  defaultValue: number,
): number => {
  if (portValue) {
    const parsed = parseInt(portValue, 10);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return defaultValue;
};

// Define configuration based on environment variables
const config: Config = {
  mongodb: {
    dbURI: process.env.MONGO_DB_URI || 'default_mongo_uri/alpha_data',
    dbName: process.env.MONGO_DB_NAME || 'alpha_data',
  },
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  serverConfig: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
  twilioConfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'default_account_sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'default_auth_token',
    fromNumber: process.env.TWILIO_PHONE_NUMBER || 'default_phone_number',
  },
  s3Config: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || 'default_access_key',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'default_secret_key',
    s3_endpoint: process.env.S3_ENDPOINT || 'default endpoint',
    region: process.env.S3_REGION || 'ap-south-1',
  },
  minioConfig: {
    endPoint: process.env.MINIO_ENDPOINT || 'default_endpoint',
    useSSL: process.env.MINIO_SSLFLAG?.toLowerCase() === 'true', // Correctly parse the boolean value
    accessKeyId: process.env.MINIO_ACCESS_KEY_ID || 'default_access_key',
    secretAccessKey:
      process.env.MINIO_SECRET_ACCESS_KEY || 'default_secret_key',
    bucketName: process.env.MINIO_BUCKET_NAME || 'default_bucket_name',
    port: parsePort(process.env.MINIO_BUCKET_PORT, 9000),
  },
  jwtSecretExpiry: parseInt(process.env.JWT_SECRET_EXPIRY || '10080', 10),
  temporalUserTaskQueue:
    process.env.TEMPORAL_USER_TASK_QUEUE || 'default_task_queue',
  temporalCloudAddress: process.env.TEMPORAL_CLOUD_ADDRESS || 'ld',
  temporalNamespace: process.env.TEMPORAL_NAMESPACE || 'ss',
  temporalCertificatesBasePath:
    process.env.TEMPORAL_CERTIFICATES_BASE_PATH ||
    `${rootDir}/temporal_certificates`,
};

export default config;
