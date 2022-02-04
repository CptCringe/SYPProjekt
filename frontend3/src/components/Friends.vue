<template>
  <div id="list-demo">
    <button @click="addFriend">Add</button>
    <button @click="removeFriend">Remove</button>
    <transition-group name="list" tag="ul">
      <li v-for="item in getFriends" :key="item" class="list-item">
        Item: {{ item }}
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

  },
  beforeMount() {
    this.getFriends();
  },
  methods: {
    addFriend(){

    },
    removeFriend(){

    },
    getFriends(){
      // Holen der Freunde des current users
      return this.$store.dispatch("friend/getFriends", this.currentUser).then(
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    }
  }
}
</script>

<style scoped>

</style>