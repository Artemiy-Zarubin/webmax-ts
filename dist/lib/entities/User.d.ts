/**
 * Класс представляющий пользователя
 */
export default class User {
    id: string | number | null;
    firstname: string;
    lastname: string;
    username: string | null;
    phone: string | null;
    avatar: string | null;
    photoId: string | number | null;
    status: string;
    bio: string;
    rawData: Record<string, unknown>;
    constructor(data: Record<string, any>);
    /**
     * Возвращает полное имя пользователя
     */
    get fullname(): string;
    /**
     * Возвращает строковое представление пользователя
     */
    toString(): string;
    /**
     * Возвращает JSON представление
     */
    toJSON(): {
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
}
//# sourceMappingURL=User.d.ts.map