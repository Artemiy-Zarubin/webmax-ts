import User from './User.js';
/**
 * Класс представляющий действие в чате
 */
export default class ChatAction {
    client: any;
    type: string | null;
    chatId: string | number | null;
    userId: string | number | null;
    user: User | null;
    timestamp: number;
    rawData: Record<string, any>;
    constructor(data: Record<string, any>, client: any);
    /**
     * Возвращает строковое представление действия
     */
    toString(): string;
    /**
     * Возвращает JSON представление
     */
    toJSON(): {
        type: string;
        chatId: string | number;
        userId: string | number;
        user: {
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
    };
}
//# sourceMappingURL=ChatAction.d.ts.map