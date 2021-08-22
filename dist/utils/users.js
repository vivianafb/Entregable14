"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomUsers = exports.getCurrentUser = exports.removeUser = exports.addUser = void 0;
var users = [];
//Join User to CHat
var addUser = function (id, username, room) {
    var user = {
        id: id,
        username: username,
        room: room,
    };
    users.push(user);
};
exports.addUser = addUser;
var removeUser = function (id) {
    users = users.filter(function (aUser) { return aUser.id !== id; });
};
exports.removeUser = removeUser;
var getCurrentUser = function (id) {
    return users.find(function (aUser) { return aUser.id === id; });
};
exports.getCurrentUser = getCurrentUser;
var getRoomUsers = function (room) {
    return users.filter(function (aUser) { return aUser.room === room; });
};
exports.getRoomUsers = getRoomUsers;
