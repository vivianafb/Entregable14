"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessages = void 0;
var moment_1 = __importDefault(require("moment"));
var formatMessages = function (data) {
    var username = data.username, text = data.text;
    return {
        username: username,
        text: text,
        time: moment_1.default().format('DD/MM/YYY hh:mm:ss'),
    };
};
exports.formatMessages = formatMessages;
