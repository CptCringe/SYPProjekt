<template>
  <div><h3>Edit</h3></div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "EditUser",
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
      newname: null
    }
  },
  created() {

  },
  methods: {
    fetchData(){
      this.loading = true;
      UserService.edituser(this.$route.params.id,newname, (err, post) =>{
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