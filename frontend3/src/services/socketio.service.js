import { io } from 'socket.io-client';

class SocketIoService {
    socket;
    curRoom;
    constructor() {}

    setupSocketConnection() {
        this.socket = io("http://localhost:8081");

        this.socket.on('Message', (data) => {
            console.log(data);
        });

    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    createRoom(room){
        if(this.socket){
            this.curRoom = room;
            this.socket.emit('createRoom',room);
        }
    }



    joinRoom(room){
        if(this.socket){
            this.curRoom = room;
            this.socket.emit('joinRoom', room);
        }
    }

    newRoomMessage(msg){
        if(this.socket && this.curRoom){
            this.socket.emit('RoomMessage',msg);
        }
    }
}

export default new SocketIoService();