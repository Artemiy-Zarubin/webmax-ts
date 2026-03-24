import User from './User.js';
/**
 * Класс представляющий сообщение
 */
export default class Message {
    client: any;
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
    attachments: any[];
    rawData: Record<string, any>;
    constructor(data: Record<string, any>, client: any);
    /**
     * Получить информацию об отправителе
     */
    fetchSender(): Promise<User>;
    /**
     * Получить имя отправителя
     */
    getSenderName(): string;
    /**
     * Ответить на сообщение
     */
    reply(options: string | {
        text?: string;
        cid?: number;
        [key: string]: any;
    }): Promise<any>;
    /**
     * Редактировать сообщение
     */
    edit(options: string | {
        text?: string;
        [key: string]: any;
    }): Promise<any>;
    /**
     * Удалить сообщение
     */
    delete(): Promise<any>;
    /**
     * Переслать сообщение
     */
    forward(chatId: string | number): Promise<any>;
    /**
     * Возвращает строковое представление сообщения
     */
    toString(): string;
    /**
     * Возвращает JSON представление
     */
    toJSON(): {
        id: string | number;
        cid: string | number;
        chatId: string | number;
        text: string;
        senderId: string | number;
        sender: {
            id: string | number;
            firstname: string;
            lastname: string;
            username: string;
            phone: string;
            avatar: string;
            photoId: string | number;
            status: string;
            bio: string;
        };
        timestamp: number;
        type: string;
        isEdited: boolean;
        replyTo: string | number;
        attachments: any[];
    };
}
//# sourceMappingURL=Message.d.ts.map