<template>
  <div><h3>Edit</h3></div>
  <Form @submit="fetchData">
    <div class="form-group">
      <Field name="newname" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" >
        Change Username
      </button>
    </div>
  </Form>
  <div v-if="error">Error: {{error.message}}</div>
  <div v-if="loading">Loading...</div>
</template>

<script>
import UserService from "../services/user.service";
import {Field, Form} from "vee-validate";

export default {
  name: "EditUser",
  components: {
    Form,
    Field
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data(){
    return{
      loading: false,
      post: null,
      error: null

    }
  },
  created() {

  },
  methods: {
    fetchData(newname){
      this.loading = true;
      UserService.edituser(this.currentUser.id,newname, (err, post) =>{
        if(err){
          this.loading = false;
          this.error = err.toString();
        } else {
          this.loading = false;
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