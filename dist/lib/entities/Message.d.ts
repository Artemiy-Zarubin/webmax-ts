import type WebMaxClient from '../client.js';
import type { DownloadToFileResult } from '../client.js';
import User from './User.js';
type UnknownRecord = Record<string, unknown>;
export interface MessageAttachment {
    _type?: string;
    fileId?: string | number;
    id?: string | number;
    name?: string;
    size?: number;
    token?: string;
    baseUrl?: string;
    [key: string]: unknown;
}
export interface FileMessageAttachment extends MessageAttachment {
    _type: 'FILE';
    fileId: string | number;
}
type MessageReplyOptions = {
    text?: string;
    cid?: number;
    [key: string]: unknown;
};
type MessageEditOptions = {
    text?: string;
    [key: string]: unknown;
};
type MessageDownloadOptions = {
    output?: string;
};
/**
 * Класс представляющий сообщение
 */
export default class Message {
    client: WebMaxClient;
    id: string | number | null;
    cid: string | number | null;
    chatId: string | number | null;
    text: string;
    senderId: string | number | null;
    sender: User | null;
    timestamp: number;
    type: string;
    isEdited: boolean;
    replyTo: string | number | null;
    attachments: MessageAttachment[];
    attaches: MessageAttachment[];
    rawData: UnknownRecord;
    constructor(data: UnknownRecord, client: WebMaxClient);
    /**
     * Получить информацию об отправителе
     */
    fetchSender(): Promise<User | null>;
    /**
     * Получить имя отправителя
     */
    getSenderName(): string;
    /**
     * Ответить на сообщение
     */
    reply(options: string | MessageReplyOptions): Promise<Message | {
        [x: string]: unknown;
    } | null>;
    /**
     * Редактировать сообщение
     */
    edit(options: string | MessageEditOptions): Promise<Message | {
        [x: string]: unknown;
    } | null>;
    /**
     * Удалить сообщение
     */
    delete(): Promise<boolean>;
    /**
     * Переслать сообщение
     */
    forward(chatId: string | number): Promise<unknown>;
    /**
     * Скачать FILE-вложение из сообщения
     */
    downloadFile(index?: number, options?: MessageDownloadOptions): Promise<Buffer | DownloadToFileResult>;
    /**
     * Возвращает строковое представление сообщения
     */
    toString(): string;
    /**
     * Возвращает JSON представление
     */
    toJSON(): {
        id: string | number | null;
        cid: string | number | null;
        chatId: string | number | null;
        text: string;
        senderId: string | number | null;
        sender: {
            id: string | number | null;
            firstname: string;
            lastname: string;
            username: string | null;
            phone: string | null;
            avatar: string | null;
            photoId: string | number | null;
            status: string;
            bio: string;
        } | null;
        timestamp: number;
        type: string;
        isEdited: boolean;
        replyTo: string | number | null;
        attachments: MessageAttachment[];
    };
}
export {};
//# sourceMappingURL=Message.d.ts.map