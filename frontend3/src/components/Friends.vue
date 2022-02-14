<template>
  <div id="list-demo">
    <button @click="addFriend">Add</button>
    <button @click="removeFriend">Remove</button>
    <transition-group name="list" tag="ul">
      <li v-for="item in currFriends" :key="item" class="list-item">
        {{ item.username }}
      </li>
    </transition-group>
  </div>

</template>

<script>
export default {
  name: "Friends",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currFriends(){
      return JSON.parse(localStorage.getItem('friends'));
    }
  },
  // beforeMount() {
  //   this.getFriends();
  // },
  methods: {
    addFriend(){

    },
    removeFriend(){

    },
  }
}
</script>

<style scoped>

</style>