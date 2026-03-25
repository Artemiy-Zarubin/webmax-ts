"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("./User.js"));
const isRecord = (value) => typeof value === 'object' && value !== null;
const asId = (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
        return value;
    }
    return null;
};
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
const isFileAttach = (attachment) => attachment._type === 'FILE' && (typeof attachment.fileId === 'string' || typeof attachment.fileId === 'number');
const getFileIdFromAttach = (attachment) => {
    const fileId = attachment.fileId ?? attachment.file_id ?? attachment.id;
    if (typeof fileId === 'string' || typeof fileId === 'number') {
        return fileId;
    }
    return null;
};
/**
 * Класс представляющий сообщение
 */
class Message {
    constructor(data, client) {
        this.client = client;
        this.id = asId(data.id) || asId(data.messageId) || null;
        this.cid = asId(data.cid) || null;
        this.chatId = asId(data.chatId) || asId(data.chat_id) || null;
        // Обработка text: может быть строкой или объектом
        if (typeof data.text === 'string') {
            this.text = data.text;
        }
        else if (isRecord(data.text)) {
            const innerText = data.text.text;
            this.text = typeof innerText === 'string' ? innerText : JSON.stringify(data.text);
        }
        else if (typeof data.message === 'string') {
            this.text = data.message;
        }
        else {
            this.text = '';
        }
        // Обработка sender: может быть объектом User или просто ID
        if (data.sender) {
            if (isRecord(data.sender)) {
                this.senderId = asId(data.sender.id);
                this.sender = new User_js_1.default(data.sender);
            }
            else if (typeof data.sender === 'string' || typeof data.sender === 'number') {
                // Если sender - это просто ID (число)
                this.senderId = data.sender;
                this.sender = null; // Будет загружен позже при необходимости
            }
            else {
                this.senderId = null;
                this.sender = null;
            }
        }
        else {
            this.senderId = asId(data.senderId) || asId(data.sender_id) || asId(data.from_id) || null;
            this.sender = null;
        }
        this.timestamp = typeof data.timestamp === 'number' ? data.timestamp : typeof data.time === 'number' ? data.time : Date.now();
        this.type = typeof data.type === 'string' ? data.type : 'text';
        this.isEdited = Boolean(data.isEdited || data.is_edited);
        this.replyTo = asId(data.replyTo) || asId(data.reply_to) || null;
        const rawAttachments = Array.isArray(data.attaches) ? data.attaches : Array.isArray(data.attachments) ? data.attachments : [];
        this.attachments = rawAttachments.filter(isRecord);
        this.attaches = this.attachments;
        this.rawData = data;
    }
    /**
     * Получить информацию об отправителе
     */
    async fetchSender() {
        if (!this.sender && this.senderId) {
            try {
                this.sender = await this.client.getUser(this.senderId);
            }
            catch (error) {
                console.error('Ошибка загрузки информации об отправителе:', getErrorMessage(error));
            }
        }
        return this.sender;
    }
    /**
     * Получить имя отправителя
     */
    getSenderName() {
        if (this.sender) {
            return this.sender.fullname || this.sender.firstname || 'User';
        }
        return this.senderId ? `User ${this.senderId}` : 'Unknown';
    }
    /**
     * Ответить на сообщение
     */
    async reply(options) {
        if (typeof options === 'string') {
            options = { text: options };
        }
        return await this.client.sendMessage({
            chatId: this.chatId,
            text: options.text,
            cid: options.cid || Date.now(),
            replyTo: this.id,
            ...options,
        });
    }
    /**
     * Редактировать сообщение
     */
    async edit(options) {
        if (typeof options === 'string') {
            options = { text: options };
        }
        return await this.client.editMessage({
            messageId: this.id,
            chatId: this.chatId,
            text: options.text,
            ...options,
        });
    }
    /**
     * Удалить сообщение
     */
    async delete() {
        return await this.client.deleteMessage({
            messageId: this.id,
            chatId: this.chatId,
        });
    }
    /**
     * Переслать сообщение
     */
    async forward(chatId) {
        const forwarder = this.client;
        return await forwarder.forwardMessage({
            messageId: this.id,
            fromChatId: this.chatId,
            toChatId: chatId,
        });
    }
    /**
     * Скачать FILE-вложение из сообщения
     */
    async downloadFile(index, options = {}) {
        if (!this.chatId || !this.id) {
            throw new Error('Невозможно скачать файл: отсутствует chatId или messageId');
        }
        let attachment = null;
        if (typeof index === 'number') {
            const candidate = this.attachments[index];
            if (!candidate || !isFileAttach(candidate)) {
                throw new Error(`Вложение с индексом ${index} не является FILE`);
            }
            attachment = candidate;
        }
        else {
            const found = this.attachments.find(isFileAttach);
            if (found) {
                attachment = found;
            }
        }
        if (!attachment) {
            throw new Error('В сообщении нет FILE-вложений');
        }
        const fileId = getFileIdFromAttach(attachment);
        if (!fileId) {
            throw new Error('Не удалось определить fileId для FILE-вложения');
        }
        return this.client.downloadFile({
            fileId,
            chatId: this.chatId,
            messageId: this.id,
            output: options.output,
        });
    }
    /**
     * Возвращает строковое представление сообщения
     */
    toString() {
        return `Message(id=${this.id}, from=${this.senderId}, text="${this.text.substring(0, 50)}")`;
    }
    /**
     * Возвращает JSON представление
     */
    toJSON() {
        return {
            id: this.id,
            cid: this.cid,
            chatId: this.chatId,
            text: this.text,
            senderId: this.senderId,
            sender: this.sender ? this.sender.toJSON() : null,
            timestamp: this.timestamp,
            type: this.type,
            isEdited: this.isEdited,
            replyTo: this.replyTo,
            attachments: this.attachments,
        };
    }
}
exports.default = Message;
