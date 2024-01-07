interface Metadata {
}
interface FileUpdateResult {
}
interface UserSetting {
    userId: string;
    settings: object;
}
interface PrivacySettings {
}
interface Metric {
}
interface ActivityLog {
}
interface StorageInfo {
}
export declare class DatabaseService {
    updateUserPreferences(userId: string, preferences: any): void;
    revokeSharedAccess(userId: string, mediaId: string | undefined): void;
    updateSharedAccess(userId: string, mediaId: string | undefined, newPermissions: any): void;
    createSharedAccess(userId: string, mediaId: string | undefined, shareWithUserId: any): void;
    listSharedAccess(userId: string): void;
    checkHealth(): Promise<boolean>;
    getMetadata(mediaId: string): Promise<Metadata>;
    updateFile(mediaId: string, fileData: unknown): Promise<FileUpdateResult>;
    deleteFile(mediaId: string): Promise<void>;
    updateUserSettings(userId: string, settings: UserSetting): Promise<UserSetting>;
    getUserSettings(userId: string): Promise<UserSetting>;
    updatePrivacySettings(userId: string, privacySettings: PrivacySettings): Promise<PrivacySettings>;
    logMetrics(metrics: any): Promise<void>;
    getMetrics(): Promise<Metric[]>;
    getActivityLog(userId: string): Promise<ActivityLog[]>;
    getStorageInfo(userId: string): Promise<StorageInfo>;
}
export {};
//# sourceMappingURL=database_service.d.ts.map