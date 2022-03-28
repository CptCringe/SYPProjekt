<template>

  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>BATTLE</h3>
        <label for="roomName">Room Name</label>
        <input type="text" id="roomName" name="roomName" v-on:change="saveRoomName()">
        <button v-if="!joinedRoom" v-on:click="joinRoom()">Join Room</button>
        <button v-if="joinedRoom" v-on:click="leaveRoom()">Leave Room</button>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}:</span>{{ msg.message }}</p>
          <hr>
        </div>
      </div>
    </div>
    <div v-if="joinedRoom" class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group pb-3">
          <button type="submit" class="btn btn-success">Selection 1</button>
          <button type="submit" class="btn btn-success">Selection 2</button>
          <button type="submit" class="btn btn-success">Selection 3</button>
        </div>

      </form>
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
  name: "GlobalChat",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      loading: false,
      error: null,
      roomName: "",
      socket: io("http://localhost:8081/battle"),
      selection: 0,
      choices: [],
      joinedRoom: false,
      message: "",
      messages: []
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
    },
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_CHOICE', {selection: this.selection, user: this.user.username});
      this.message = '';
    }


  },
  mounted() {
    //this.socket.auth = JSON.parse(localStorage.getItem('user')).username;
    this.socket.on('SERVER_MESSAGE', (data) => {
      this.messages.push(data);
      console.log(data);
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