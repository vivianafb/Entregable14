"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWsServer = void 0;
var socket_io_1 = require("socket.io");
var messages_1 = require("../utils/messages");
var users_1 = require("../utils/users");
var data = {
    username: undefined,
    text: undefined,
};
var initWsServer = function (server) {
    var io = new socket_io_1.Server(server);
    io.on('connection', function (socket) {
        console.log('Nueva Conexion establecida!');
        //New User Joined room
        socket.on('JoinRoom', function (msg) {
            users_1.addUser(socket.client.id, msg.username, msg.room);
            var user = users_1.getCurrentUser(socket.client.id);
            if (user.username != undefined) {
                socket.join(user.room);
                //Send a message to the newUser
                data.username = 'CHATBOT';
                data.text = 'Bienvenido! ';
                socket.emit('message', messages_1.formatMessages(data));
                data.text = user.username + " se ha unido al chat!";
                //BroadCast when a user connects
                socket.broadcast.to(user.room).emit('message', messages_1.formatMessages(data));
                //Send Room info
                var roomInfo = {
                    room: user.room,
                    users: users_1.getRoomUsers(user.room),
                };
                io.to(user.room).emit('roomUsers', roomInfo);
            }
        });
        //Let everyone knows that a user left the chat
        socket.on('disconnect', function () {
            var user = users_1.getCurrentUser(socket.client.id);
            if (user) {
                users_1.removeUser(socket.client.id);
                data.username = 'CHATBOT';
                data.text = user.username + " a dejado el chat";
                io.to(user.room).emit('message', messages_1.formatMessages(data));
                //Send Room info
                var roomInfo = {
                    room: user.room,
                    users: users_1.getRoomUsers(user.room),
                };
                io.to(user.room).emit('roomUsers', roomInfo);
            }
        });
        //Listen for chat messages
        socket.on('chatMessage', function (msg) {
            var user = users_1.getCurrentUser(socket.client.id);
            data.username = user.username;
            data.text = msg;
            io.to(user.room).emit('message', messages_1.formatMessages(data));
        });
    });
    return io;
};
exports.initWsServer = initWsServer;
