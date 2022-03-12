<template>
  <div>
    <h3>List Editor</h3>
    <button v-on:click="addRow()">Add row</button>
    <button v-on:click="removeRow()">Remove row</button>
    <button v-on:click="submitList()">Submit list</button>
    <button v-on:click="download_csv_file()">Download list</button>
    <div>
      <input type="checkbox" id="isPrivate" name="isPrivate" v-on:click="toggleIsPrivate()">
      <label for="isPrivate">Private</label>
    </div>
    <div>
      <label for="upload">Upload file</label>
      <input type="file" id="upload" name="upload" v-on:change="readCsv()">
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
      if(this.list.length!== 1){
        this.list.pop();
      }
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

    download_csv_file() {
      //define the heading for each row of the data
      var csv = 'Deutsch;Englisch\n';
      document.querySelectorAll('#voc-list tr').forEach((item,index)=>{
        if(index !== 0){
          this.list[index-1].toLanguage= item.children[1].innerHTML;
          this.list[index-1].fromLanguage= item.children[0].innerHTML;
        }

      })

      //merge the data with CSV
      this.list.forEach(function(row) {
        csv += row.fromLanguage+";"+row.toLanguage;
        csv += "\n";
      });

      //display the created CSV data on the web browser
      //document.write(csv);


      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = `${this.listName}.csv`;
      hiddenElement.style.display = "none";
      document.body.appendChild(hiddenElement);
      hiddenElement.click();
    },

    async readCsv(){
      let input = document.querySelector("#upload");
      var result = await this.readFile(input.files[0]);

      console.log(result);
      result.split("\n").forEach((item, index) =>{
        if(index !== 0 && item.trim() !==""){
          if(index ==1){
            var parts2 = item.split(";");
            console.log(parts2);
            this.list[index-1]={toLanguage: parts2[1], fromLanguage: parts2[0]};

          }else{
            console.log(item);
            var parts = item.split(";");
            console.log(parts);
            this.list.push({toLanguage: parts[1], fromLanguage: parts[0]});

          }
        }
      })

      console.log(this.list);
    },

    async readFile(file){

      return new Promise((resolve)=>{
        var fr=new FileReader();
        fr.onload=function(){
          resolve(fr.result);
        }

        fr.readAsText(file);
      })
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