import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
  mongodb: {
    dbURI: string;
    dbName: string;
  };
  jwtSecret: string;
  serverConfig: {
    port: number;
  };
  twilioConfig: {
    accountSid: string;
    authToken: string;
    fromNumber: string;
  };
  awsConfig: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  jwtSecretExpiry: number;
  temporalUserTaskQueue: string;
}

// Define configuration based on environment variables
const config: Config = {
  mongodb: {
    dbURI: process.env.MONGO_DB_URI || "default_mongo_uri",
    dbName: process.env.MONGO_DB_NAME || "default_db_name",
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
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "default_access_key",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "default_secret_key",
  },
  jwtSecretExpiry: parseInt(process.env.JWT_SECRET_EXPIRY || "10080", 10),
  temporalUserTaskQueue:
    process.env.TEMPORAL_USER_TASK_QUEUE || "default_task_queue",
};

export default config;
