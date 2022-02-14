<template>
  <div id="list-demo">

    <Form @submit="addFriend">
      <div class="form-group">
        <Field name="id" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" >

          Add
        </button>
      </div>
    </Form>
    <Form @submit="removeFriend">
      <div class="form-group">
        <Field name="id" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" >

          Remove
        </button>
      </div>
    </Form>
    <transition-group name="list" tag="ul">
      <li v-for="item in currFriends" :key="item" class="list-item">
        {{ item.username }} Id: {{item.userId}}
      </li>
    </transition-group>
  </div>

</template>

<script>
import FriendService from "../services/friend.service";
import {Field, Form} from "vee-validate";
export default {
  name: "Friends",
  components: {
    Form,
    Field,

  },
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
    addFriend(id){
      FriendService.addFriend(this.currentUser,id);
    },
    removeFriend(id){
      FriendService.removeFriend(this.currentUser, id);
    },
  }
}
</script>

<style scoped>

</style>