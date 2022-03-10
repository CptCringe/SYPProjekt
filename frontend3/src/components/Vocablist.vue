<template>
  <div id="list-demo">
    <h3>Private Vokabellisten <button><router-link to="/listEditor" class="nav-link">
      Create List <font-awesome-icon icon="edit"></font-awesome-icon>
    </router-link></button></h3>
    <transition-group name="table" tag="ul">
      <table v-for="item in getLists" :key="item" class="table-striped">
        <router-link :to="{name: 'list', params: {id: item.listId}}" class="nav-item">
          {{ item.listId }}: {{ item.listName }}
        </router-link>
      </table>
    </transition-group>

  </div>
  <div id="public-list">
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
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.getPublicLists()
        },
        {immediate: true}
    )
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
  #list-demo{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #public-list{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #public-list div{
    width:calc(100% - 200px);
  }
  h3{
    display:flex;
    justify-content: space-between;
    align-items: center;
    height:40px;
    width:calc(100% - 200px);
  }
  h3 button{
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: #505050;
    color:white;
    padding: 5px 8px;
    height:35px;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transition: all .4s ease;
  }

  h3 button a{
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: #505050;
    color:white;
    padding: 5px 8px;
    height:35px;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transition: all .4s ease;
  }

  h3 button a{
    background-color: transparent;
  }

  h3 button:hover{
    background-color: #202020;
  }

  h3 button a svg{
    margin-left: 10px;
  }

  #list-demo ul{
    list-style: none;
    margin:10px 0px;
    width:calc(100% - 200px);
    padding:0;
  }

  #list-demo ul table{
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

  #list-demo ul table a{
    color: #202020 !important;
  }

  #list-demo ul table:hover{
    background-color: #BBB;
  }

  #public-list ul{
    list-style: none;
    margin:10px 0px !important;
    width:100%;
    padding:0;
  }

  #public-list ul table{
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

  #public-list ul table a{
    color: #202020 !important;
  }

  #public-list ul table:hover{
    background-color: #BBB;
  }

</style>