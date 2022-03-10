<template>
  <div>List Number: {{$route.params.id}}</div>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{error}}</div>
  <div v-if="post" id="voc-list">
    <table   class="table-striped">
      <tr>
        <th>Deutsch</th>
        <th>Englisch</th>
      </tr>
      <tr v-for="item in post" :key="item">
        <td contenteditable="true">{{item.Deutsch}}</td>
        <td contenteditable="true">{{item.Englisch}}</td>
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
#voc-list{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#voc-list tr{
  width:100%;
  display:flex;
  text-decoration: none !important;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;
  height:40px;
  background-color: transparent;
  border-bottom: 1px solid #BBB;
  transition: all .4s ease;
}


#voc-list tr{
  justify-content: space-between;

  align-items: center;
}

#voc-list tr:hover{
  background-color: #BBB;
}

</style>