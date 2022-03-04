<template>
  <div id="list-demo">
    <h3>Private Vokabellisten</h3>
    <transition-group name="table" tag="ul">
      <table v-for="item in getLists" :key="item" class="table-striped">
        <router-link :to="{name: 'list', params: {id: item.listId}}" class="nav-item">
          {{ item.listId }}: {{ item.listName }}
        </router-link>
      </table>
    </transition-group>
    <h3>Öffentliche Vokabellisten</h3>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="publicLists">
      <transition-group name="table" tag="ul">
        <table v-for="item in publicLists" :key="item" class="table-striped">
          <router-link :to="{name: 'list', params: {id: item.listId}}" class="nav-item">
            {{ item.listId }}: {{ item.listName }}
          </router-link>
        </table>
      </transition-group>
    </div>
  </div>

</template>

<script>
import ListService from "../services/list.service.js";

export default {
  name: "Vocablist",
  data() {
    return {
      loading: false,
      publicLists: null,
      error: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getLists() {

      return JSON.parse(localStorage.getItem('lists'));
    },

  },
  beforeMount() {
    this.getLiists();
  },
  methods: {
    getLiists() {
      ListService.getLists(this.$store.state.auth.user);
    },
    getPublicLists() {
      this.error = this.publicLists = null;
      this.loading = true;

      ListService.getPublicLists((err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.publicLists = post;
          console.log(this.post);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>