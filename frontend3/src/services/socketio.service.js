import { io } from 'socket.io-client';

class SocketIoService {
    socket;
    curRoom;
    constructor() {}

    setupSocketConnection() {
        this.socket = io("http://localhost:8081",{autoConnect: false});
        this.socket.auth = JSON.parse(localStorage.getItem('user')).username;
        this.socket.connect();
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

            this.socket.on('NewMessage', (msg) =>{
                console.log(msg);
            });

        }
    }



    joinRoom(room){
        if(this.socket){
            this.curRoom = room;
            this.socket.emit('joinRoom', room);
            this.socket.emit('RoomMessage', 'Heeyy i jooined what upp?');
            this.socket.on('NewMessage', (msg) =>{
                console.log(msg);
            });
        }
    }

    newRoomMessage(msg){
        if(this.socket && this.curRoom){
            this.socket.emit('RoomMessage',msg);
        }
    }
}

export default new SocketIoService();