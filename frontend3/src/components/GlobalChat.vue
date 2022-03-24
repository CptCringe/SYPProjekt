<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Globalchat</h3>
        <hr>
      </div>
      <div class="card-body" >
        <div class="messages" v-for="(msg, index) in messages" :key="index" >
          <p><span class="font-weight-bold">{{ msg.user }}:</span>{{ msg.message }}</p>
          <hr>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
//import SocketIoService from '../services/socketio.service';
import io from 'socket.io-client';

export default {
  name: "GlobalChat",
  data(){
    return {
      user: JSON.parse(localStorage.getItem('user')),
      loading: false,
      error: null,
      roomName: "",
      socket: io("http://localhost:8081"),
      selection: 0,
      choices:[],
      message: "",
      messages:[]
    }
  },

  methods:{
    saveRoomName(){
      this.roomName = document.getElementById("roomName").value;
    },
    createRoom(){
      this.socket.emit('createRoom',this.roomName);
    },
    joinRoom(){
      this.socket.emit('joinRoom',this.roomName);
    },
    sendMessage(e){
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {message: this.message, user: this.user.username});
      this.message = '';
    }


  },
  mounted() {
    //this.socket.auth = JSON.parse(localStorage.getItem('user')).username;
    this.socket.on('MESSAGE', (data) => {
      this.messages.push(data);
      // you can also do this.messages.push(data)
    });
    this.socket.on('INITIAL_MESSAGES', (data) => {
      data.forEach((item) =>{
        this.messages.push(item);
      })
      // you can also do this.messages.push(data)
    });
  },

  created() {
    //SocketIoService.setupSocketConnection();
  },

  beforeUnmount() {
    this.socket.disconnect();
  }




}
</script>

<style scoped>

  .card-title{
    position: absolute;
    top:0px;
    padding-top: 15px;
    left:15px;
    width:calc(100% - 30px);
    background-color: white;
  }
  .card{
    position: relative;
    height: 600px;
  }
  .card-body:first-child{
    height: 600px;
    padding-top: 70px;
    overflow: auto;
  }
</style>