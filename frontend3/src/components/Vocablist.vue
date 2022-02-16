<template>
  <div id="list-demo">
    <h3>Vokabellisten</h3>
    <b-table striped hover :items=getLists></b-table>
  </div>

</template>

<script>
import ListService from "../services/list.service.js";

export default {
  name: "Vocablist",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getLists(){
      ListService.getLists(this.$store.state.auth.user);
      return JSON.parse(localStorage.getItem('lists'));
    }
  }
}
</script>

<style scoped>

</style>