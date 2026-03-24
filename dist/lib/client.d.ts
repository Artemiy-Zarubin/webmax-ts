import WebSocket from 'ws';
import { EventEmitter } from 'events';
import SessionManager from './session.js';
import { User } from './entities/index.js';
import { UserAgentPayload } from './userAgent.js';
export interface WebMaxClientOptions {
    phone?: string | null;
    name?: string;
    session?: string;
    apiUrl?: string;
    userAgent?: UserAgentPayload;
    appVersion?: string;
    deviceId?: string;
    maxReconnectAttempts?: number;
    reconnectDelay?: number;
    [key: string]: any;
}
type PendingRequest = {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    timeoutId?: NodeJS.Timeout;
};
/**
 * Основной клиент для работы с API Max
 */
declare class WebMaxClient extends EventEmitter {
    phone: string | null;
    sessionName: string;
    apiUrl: string;
    origin: string;
    session: SessionManager;
    userAgent: UserAgentPayload;
    deviceId: string;
    ws: WebSocket | null;
    me: User | null;
    isConnected: boolean;
    isAuthorized: boolean;
    reconnectAttempts: number;
    maxReconnectAttempts: number;
    reconnectDelay: number;
    seq: number;
    ver: number;
    handlers: Record<string, Array<Function>>;
    messageQueue: any[];
    pendingRequests: Map<number, PendingRequest>;
    _token?: string;
    constructor(options?: WebMaxClientOptions);
    /**
     * Регистрация обработчика события start
     */
    onStart(handler: any): any;
    /**
     * Регистрация обработчика сообщений
     */
    onMessage(handler: any): any;
    /**
     * Регистрация обработчика удаленных сообщений
     */
    onMessageRemoved(handler: any): any;
    /**
     * Регистрация обработчика действий в чате
     */
    onChatAction(handler: any): any;
    /**
     * Регистрация обработчика ошибок
     */
    onError(handler: any): any;
    /**
     * Запуск клиента
     */
    start(): Promise<void>;
    /**
     * Запрос QR-кода для авторизации (только для device_type="WEB")
     */
    requestQR(): Promise<any>;
    /**
     * Проверка статуса QR-кода
     */
    checkQRStatus(trackId: any): Promise<any>;
    /**
     * Завершение авторизации по QR-коду
     */
    loginByQR(trackId: any): Promise<any>;
    /**
     * Опрос статуса QR-кода
     */
    pollQRStatus(trackId: any, pollingInterval: any, expiresAt: any): Promise<boolean>;
    /**
     * Авторизация через QR-код
     */
    authorizeByQR(): Promise<void>;
    /**
     * Авторизация пользователя через QR-код
     */
    authorize(): Promise<void>;
    /**
     * Синхронизация с сервером (получение данных о пользователе, чатах и т.д.)
     */
    sync(): Promise<any>;
    /**
     * Получение информации о текущем пользователе
     */
    fetchMyProfile(): Promise<void>;
    /**
     * Подключение с существующей сессией
     */
    connectWithSession(): Promise<void>;
    /**
     * Установка WebSocket соединения
     */
    connect(): Promise<void>;
    /**
     * Handshake после подключения
     */
    handshake(): Promise<any>;
    /**
     * Обработка переподключения
     */
    handleReconnect(): void;
    /**
     * Обработка входящих сообщений
     */
    handleMessage(data: any): Promise<void>;
    /**
     * Отправка pong ответа на ping
     */
    sendPong(): Promise<void>;
    /**
     * Обработка нового сообщения
     */
    handleNewMessage(data: any): Promise<void>;
    /**
     * Обработка удаленного сообщения
     */
    handleRemovedMessage(data: any): Promise<void>;
    /**
     * Обработка действия в чате
     */
    handleChatAction(data: any): Promise<void>;
    /**
     * Создает сообщение в протоколе Max API
     */
    makeMessage(opcode: any, payload: any, cmd?: number): {
        ver: number;
        cmd: number;
        seq: number;
        opcode: any;
        payload: any;
    };
    /**
     * Отправка запроса через WebSocket и ожидание ответа
     */
    sendAndWait(opcode: number, payload: any, cmd?: number, timeout?: number): Promise<any>;
    /**
     * Отправка сообщения
     */
    sendMessage(options: any): Promise<any>;
    /**
     * Редактирование сообщения
     */
    editMessage(options: any): Promise<any>;
    /**
     * Удаление сообщения
     */
    deleteMessage(options: any): Promise<boolean>;
    /**
     * Получение информации о пользователе по ID
     */
    getUser(userId: any): Promise<User>;
    /**
     * Получение списка чатов
     */
    getChats(marker?: number): Promise<any>;
    /**
     * Получение истории сообщений
     */
    getHistory(chatId: any, from?: number, backward?: number, forward?: number): Promise<any>;
    /**
     * Выполнение зарегистрированных обработчиков
     */
    triggerHandlers(eventType: any, data?: any): Promise<void>;
    /**
     * Остановка клиента
     */
    stop(): Promise<void>;
    /**
     * Выход из аккаунта
     */
    logout(): Promise<void>;
}
export default WebMaxClient;
//# sourceMappingURL=client.d.ts.map