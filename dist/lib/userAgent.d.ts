/**
 * Генерация UserAgent для Max API
 */
export interface UserAgentOptions {
    locale?: string;
    deviceLocale?: string;
    osVersion?: string;
    deviceName?: string;
    headerUserAgent?: string;
    appVersion?: string;
    screen?: string;
    timezone?: string;
    clientSessionId?: number;
    buildNumber?: number;
}
/**
 * Создает UserAgent пейлоад для Max API
 */
export declare class UserAgentPayload {
    deviceType: 'WEB';
    locale: string;
    deviceLocale: string;
    osVersion: string;
    deviceName: string;
    headerUserAgent: string;
    appVersion: string;
    screen: string;
    timezone: string;
    clientSessionId: number;
    buildNumber: number;
    constructor(options?: UserAgentOptions);
    /**
     * Преобразует в объект для отправки (camelCase ключи)
     */
    toJSON(): {
        deviceType: "WEB";
        locale: string;
        deviceLocale: string;
        osVersion: string;
        deviceName: string;
        headerUserAgent: string;
        appVersion: string;
        screen: string;
        timezone: string;
        clientSessionId: number;
        buildNumber: number;
    };
}
//# sourceMappingURL=userAgent.d.ts.map