import { io } from 'socket.io-client';

class SocketIoService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io("http://localhost:8081");
    }
}

export default new SocketIoService();