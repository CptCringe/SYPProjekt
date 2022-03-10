<template>
  <div>
    <h3>List Editor</h3>
    <button v-on:click="addRow()">Add row</button>
    <button v-on:click="removeRow()">Remove row</button>
    <button v-on:click="submitList()">Submit list</button>
    <div>
      <input type="checkbox" id="isPrivate" name="isPrivate" v-on:click="toggleIsPrivate()">
      <label for="isPrivate">Private</label>
    </div>
    <div>
      <label for="isPrivate">List Name</label>
      <input type="text" id="listName" name="listName" v-on:change="saveNewName()">
    </div>
    <div  id="voc-list">
      <table   class="table-striped">
        <tr>
          <th>Deutsch</th>
          <th>Englisch</th>
        </tr>
        <tr v-for="item in list" :key="item">
          <td contenteditable="true" >{{item.fromLanguage}}</td>
          <td contenteditable="true" >{{item.toLanguage}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import ListService from "../services/list.service.js";
export default {

  name: "ListEditor",
  data() {
    return {
      loading: false,
      list: [{"toLanguage":"", "fromLanguage":""}],
      error: null,
      isPrivate: false,
      listName: ""
    }
  },
  methods: {
    addRow(){
      this.list.push({"toLanguage":"", "fromLanguage":""});
    },
    removeRow(){
      this.list.pop();
    },
    submitList(){
      document.querySelectorAll('#voc-list tr').forEach((item,index)=>{
        if(index !== 0){
          this.list[index-1].toLanguage= item.children[1].innerHTML;
          this.list[index-1].fromLanguage= item.children[0].innerHTML;
        }

      })
      ListService.createList(this.listName, this.isPrivate, "Englisch","Deutsch",this.list,this.$store.state.auth.user,(res,err)=>{
        console.log(res,err);
      })

      console.log(this.list);
      console.log(this.isPrivate);
    },

    toggleIsPrivate(){
      this.isPrivate =  !this.isPrivate;
    },

    saveNewName(){
      this.listName = document.getElementById("listName").value;
    }

  }
}

</script>

<style scoped>
table td{
  border: 1px solid #BBB;
}


</style>