<template>
  <div>
    <h3>BATTLE</h3>
    <label for="roomName">Room Name</label>
    <input type="text" id="roomName" name="roomName" v-on:change="saveRoomName()">
    <button v-on:click="joinRoom()">Join Room</button>
    <button v-on:click="createRoom()">Create Room</button>

  </div>
</template>

<script>
import SocketIoService from '../services/socketio.service';
export default {
  name: "StandardBattle",
  data(){
    return {
      loading: false,
      error: null,
      isPrivate: false,
      roomName: ""
    }
  },

  methods:{
    saveRoomName(){
      this.roomName = document.getElementById("roomName").value;
    },
    createRoom(){
      SocketIoService.createRoom(this.roomName);
    },
    joinRoom(){
      SocketIoService.joinRoom(this.roomName);
    }


  },
  created() {
    SocketIoService.setupSocketConnection();
  },

  beforeUnmount() {
    SocketIoService.disconnect();
  }




}
</script>

<style scoped>

</style>