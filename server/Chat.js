const uuidv4 = require('uuid').v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
    constructor(io, socket) {
        console.log("It's working mano")
        this.socket = socket;
        this.io = io;

        socket.on('getMessages', () => this.getMessages());
        socket.on('message', (value) => this.handleMessage(value));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    
    sendMessage(message) {
        console.log(message);
        this.io.sockets.emit('message', message);
    }
    
    getMessages() {
        messages.forEach((message) => this.sendMessage(message));
    }

    handleMessage(value) {
        console.log(value);
        const message = {
            id: uuidv4(),
            user: users.get(this.socket) || defaultUser,
            value,
            time: Date.now()
        };

        messages.add(message);
        this.sendMessage(message);

        setTimeout(
            () => {
                messages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id);
            },
            messageExpirationTimeMS,
        );
    }

    disconnect() {
        users.delete(this.socket);
    }
}

function chat(io) {
    io.on('connection', (socket) => {
        console.log("Connection is running")
        new Connection(io, socket);   
    });
};

module.exports = chat;