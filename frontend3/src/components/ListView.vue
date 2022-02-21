<template>
  <div>List Number: {{$route.params.id}}</div>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{error}}</div>
  <div v-if="post">
    <table   class="table-striped">
      <tr>
        <th>Deutsch</th>
        <th>Englisch</th>
      </tr>
      <tr v-for="item in post" :key="item">
        <td>{{item.Deutsch}}</td>
        <td>{{item.Englisch}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ListService from "../services/list.service.js";

export default {
  name: "ListView",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data(){
    return{
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        {immediate: true}
    )
  },
  methods: {
    fetchData(){
      this.error = this.post = null;
      this.loading = true;

      ListService.getList(this.$route.params.id, (err, post) =>{
        this.loading = false;
        if(err){
          this.error = err.toString();
         } else {
          this.post = post;
          console.log(this.post);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>