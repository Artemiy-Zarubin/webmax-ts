/**
 * Константы для библиотеки WebMax
 */

export const ChatActions = {
  TYPING: 'typing',
  STICKER: 'sticker',
  FILE: 'file',
  RECORDING_VOICE: 'recording_voice',
  RECORDING_VIDEO: 'recording_video',
} as const;

export const EventTypes = {
  START: 'start',
  MESSAGE: 'message',
  MESSAGE_REMOVED: 'message_removed',
  CHAT_ACTION: 'chat_action',
  ERROR: 'error',
  DISCONNECT: 'disconnect',
} as const;

export const MessageTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  STICKER: 'sticker',
} as const;
