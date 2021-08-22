"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productos_1 = __importDefault(require("./routes/productos"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var http = __importStar(require("http"));
var socket_1 = require("./services/socket");
var app = express_1.default();
var server = new http.Server(app);
var myWSServer = socket_1.initWsServer(server);
var puerto = 8080;
server.listen(puerto, function () { return console.log('Server up en puerto', puerto); });
var publicPath = path_1.default.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
var layoutFolderPath = path_1.default.resolve(__dirname, '../views/layouts');
var defaultLayerPth = path_1.default.resolve(__dirname, '../views/layouts/index.hbs');
app.set('view engine', 'hbs');
app.engine('hbs', express_handlebars_1.default({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
}));
// const myWSServer = io(server);
var messages = [];
myWSServer.on('connection', function (socket) {
    console.log('\n\nUn cliente se ha conectado');
    console.log("ID DEL SOCKET DEL CLIENTE => " + socket.client.id);
    console.log("ID DEL SOCKET DEL SERVER => " + socket.id);
    socket.on('new-message', function (data) {
        var newMessage = {
            message: data,
        };
        messages.push(newMessage);
        myWSServer.emit('messages', messages);
    });
    socket.on('askData', function (data) {
        console.log('ME LLEGO DATA');
        myWSServer.emit('messages', messages);
    });
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/productos', productos_1.default);
