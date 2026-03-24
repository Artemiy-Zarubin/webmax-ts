"use strict";
/**
 * WebMaxSocket - Node.js библиотека для работы с API мессенджера Max
 * tellarion.dev
 *
 * @module webmaxsocket
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgentPayload = exports.getOpcodeName = exports.Opcode = exports.MessageTypes = exports.EventTypes = exports.ChatActions = exports.ChatAction = exports.Message = exports.User = exports.WebMaxClient = void 0;
const client_js_1 = __importDefault(require("./lib/client.js"));
exports.WebMaxClient = client_js_1.default;
const index_js_1 = require("./lib/entities/index.js");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return index_js_1.User; } });
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return index_js_1.Message; } });
Object.defineProperty(exports, "ChatAction", { enumerable: true, get: function () { return index_js_1.ChatAction; } });
const constants_js_1 = require("./lib/constants.js");
Object.defineProperty(exports, "ChatActions", { enumerable: true, get: function () { return constants_js_1.ChatActions; } });
Object.defineProperty(exports, "EventTypes", { enumerable: true, get: function () { return constants_js_1.EventTypes; } });
Object.defineProperty(exports, "MessageTypes", { enumerable: true, get: function () { return constants_js_1.MessageTypes; } });
const opcodes_js_1 = require("./lib/opcodes.js");
Object.defineProperty(exports, "Opcode", { enumerable: true, get: function () { return opcodes_js_1.Opcode; } });
Object.defineProperty(exports, "getOpcodeName", { enumerable: true, get: function () { return opcodes_js_1.getOpcodeName; } });
const userAgent_js_1 = require("./lib/userAgent.js");
Object.defineProperty(exports, "UserAgentPayload", { enumerable: true, get: function () { return userAgent_js_1.UserAgentPayload; } });
