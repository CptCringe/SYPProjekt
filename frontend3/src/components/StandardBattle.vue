<template>
  <div>
    <h3>BATTLE</h3>
  </div>
</template>

<script>
import SocketIoService from '../services/socketio.service';
export default {
  name: "StandardBattle",
  methods:{
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