<template>
  <div id="list-demo">
    <h3>Vokabellisten</h3>
    <transition-group name="table" tag="ul">
      <table v-for="item in getLists" :key="item" class="table-striped">
        <router-link :to="{name: 'list', params: {id: item.listId}}" class="nav-item">{{item.listId}}: {{item.listName}}</router-link>
      </table>
    </transition-group>
  </div>

</template>

<script>
import ListService from "../services/list.service.js";

export default {
  name: "Vocablist",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getLists(){

      return JSON.parse(localStorage.getItem('lists'));
    }
  },
  beforeMount() {
    this.getLiists();
  },
  methods: {
    getLiists(){
      ListService.getLists(this.$store.state.auth.user);
    }
  }
}
</script>

<style scoped>

</style>