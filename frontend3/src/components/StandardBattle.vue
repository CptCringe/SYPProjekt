<template>

  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>BATTLE</h3>
        <label for="roomName" v-if="!joinedRoom">Room Name</label>
        <input type="text" id="roomName" name="roomName" v-on:change="saveRoomName()" v-if="!joinedRoom">
        <button v-if="!joinedRoom" v-on:click="joinRoom()">Join Room</button>
        <button v-if="joinedRoom" v-on:click="leaveRoom()">Leave Room</button>
      </div>
      <div class="card-body" id="messageContainer">
        <div class="messages" v-for="(msg, index) in messages" :key="index" >
          <p><span class="font-weight-bold">{{ msg.user }}:</span>{{ msg.message }}</p>
          <hr>
        </div>
      </div>
    </div>
    <div v-if="joinedRoom" class="card-footer">
        <div class="gorm-group pb-3" v-if="this.gameStarted">
          <button type="submit" class="btn btn-success" v-on:click="selectionOne">{{this.choices[0].choice}}</button>
          <button type="submit" class="btn btn-success" v-on:click="selectionTwo">{{this.choices[1].choice}}</button>
          <button type="submit" class="btn btn-success" v-on:click="selectionThree">{{this.choices[2].choice}} </button>
        </div>
        <div v-if="!gameStarted">
          <button type="submit" class="btn btn-success" v-on:click="startGame">Start Game</button>
        </div>

    </div>
    <div v-if="!joinedRoom" class="card-footer">
      <h3>Tritt zuerst einem Raum bei :)</h3>
    </div>
  </div>

</template>

<script>
//import SocketIoService from '../services/socketio.service';
import io from 'socket.io-client';

export default {
  name: "StandardBattle",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      loading: false,
      error: null,
      roomName: "",
      socket: io("http://localhost:8081/battle"),
      selection: 0,
      choices: [],
      question: "",
      joinedRoom: false,
      message: "",
      messages: [],
      gameStarted: false,
      points: 0
    }
  },

  methods: {
    saveRoomName() {
      this.roomName = document.getElementById("roomName").value;
    },
    joinRoom() {
      this.socket.emit('joinRoom', {roomName: this.roomName, user: this.user.username});
      this.joinedRoom = true;
    },
    leaveRoom() {
      this.socket.emit('leaveRoom',{user: this.user.username});
      this.joinedRoom = false;
      this.messages = [];
      this.gameStarted = false;
    },
    startGame(){
      if(this.joinedRoom == true){
        this.socket.emit('startGame');
      }
    },
    selectionOne(){
      //TODO
      if(this.choices[0].oldIndex ==0) this.points++;
      this.socket.emit('MADE_SELECTION',{username: this.user.username, selection: this.choices[0].oldIndex})
    },
    selectionTwo(){
      if(this.choices[1].oldIndex ==0) this.points++;
      this.socket.emit('MADE_SELECTION',{username: this.user.username, selection: this.choices[1].oldIndex})

    },
    selectionThree(){
      if(this.choices[2].oldIndex ==0) this.points++;
      this.socket.emit('MADE_SELECTION',{username: this.user.username, selection: this.choices[2].oldIndex})

    },

  },
  mounted() {

    //this.socket.auth = JSON.parse(localStorage.getItem('user')).username;
    this.socket.on('SERVER_MESSAGE', (data) => {
      this.messages.push(data);
    });
    this.socket.on('STARTED_GAME', (data) =>{
      if(data.started == true){
        this.gameStarted = true;
        data.question.choices.forEach((item, index) => { this.choices.push({oldIndex: index,choice: item})});
        console.log(this.choices);
        this.question = data.question.question;
        this.messages.push({user: "Server", message: "Game has started!"});
        this.messages.push({user: "Server", message: this.question});
      }else {
        console.log("Zu wenig spieler");
        this.messages.push({user: "Server", message: "Zu wenig Spieler! Mindestens 2"});

      }

    });
    this.socket.on('NEW_QUESTION', (data) => {
      this.choices = [];
      data.question.choices.forEach((item, index) => { this.choices.push({oldIndex: index,choice: item})});

      this.choices = this.choices.sort(() => Math.random() - 0.5) // Mischen

      this.messages.push({user: "Server", message: data.question.question})
    });
    this.socket.on('SELECTION_RESULT', (message) => {
      this.messages.push({user: 'Server', message: ' '+message.user + ' ' + message.message});
    });
    this.socket.on('GAME_ENDED', (data) =>{
      this.gameStarted = false;

      this.messages.push({user: "Server", message: data.message});

      this.socket.emit('GAME_RESULT', {user: this.user.username, points: this.points});

      this.points = 0;
    });
    this.socket.on('USER_RESULT', (data) => {

      this.messages.push({user: 'Server', message: ' '+data.username+' '+ data.message});
    });
  },

  beforeUnmount() {
    this.socket.disconnect();
  }
}
</script>

<style scoped>
  .card-title {
    position: absolute;
    top: 0px;
    padding-top: 15px;
    left: 15px;
    width: calc(100% - 30px);
    background-color: white;
  }

  .card {
    position: relative;
    height: 600px;
  }

  .card-body:first-child {
    height: 600px;
    padding-top: 70px;
    overflow: auto;
  }
</style>