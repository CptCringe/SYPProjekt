<template>
  <div>List Number: {{$route.params.id}}</div>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{error}}</div>
  <div v-if="data"><table  v-for="item in data" :key="item" class="table-striped"></table></div>
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
      data: null,
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
      this.error = this.data = null;
      this.loading = true;

      ListService.getList(this.$route.params.id, (err, post) =>{
        this.loading = false;
        if(err){
          this.error = err.toString();
         } else {
          this.data = post;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>