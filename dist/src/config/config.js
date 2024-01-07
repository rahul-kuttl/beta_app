"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
// Load environment variables from .env file
dotenv.config();
const parsePort = (portValue, defaultValue) => {
    if (portValue) {
        const parsed = parseInt(portValue, 10);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    return defaultValue;
};
// Define configuration based on environment variables
const config = {
    mongodb: {
        dbURI: process.env.MONGO_DB_URI || "default_mongo_uri/alpha_data",
        dbName: process.env.MONGO_DB_NAME || "alpha_data",
    },
    jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
    serverConfig: {
        port: parseInt(process.env.PORT || "3000", 10),
    },
    twilioConfig: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || "default_account_sid",
        authToken: process.env.TWILIO_AUTH_TOKEN || "default_auth_token",
        fromNumber: process.env.TWILIO_PHONE_NUMBER || "default_phone_number",
    },
    s3Config: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "default_access_key",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "default_secret_key",
        s3_endpoint: process.env.S3_ENDPOINT || "default endpoint",
        region: process.env.S3_REGION || 'ap-south-1'
    },
    minioConfig: {
        endPoint: process.env.MINIO_ENDPOINT || "default_endpoint",
        useSSL: process.env.MINIO_SSLFLAG?.toLowerCase() === "true", // Correctly parse the boolean value
        accessKeyId: process.env.MINIO_ACCESS_KEY_ID || "default_access_key",
        secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY || "default_secret_key",
        bucketName: process.env.MINIO_BUCKET_NAME || "default_bucket_name",
        port: parsePort(process.env.MINIO_BUCKET_PORT, 9000),
    },
    jwtSecretExpiry: parseInt(process.env.JWT_SECRET_EXPIRY || "10080", 10),
    temporalUserTaskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "default_task_queue",
};
exports.default = config;
//# sourceMappingURL=config.js.map