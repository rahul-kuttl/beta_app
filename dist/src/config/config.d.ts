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
}
declare const config: Config;
export default config;
//# sourceMappingURL=config.d.ts.map