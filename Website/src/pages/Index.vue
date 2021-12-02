<template>
  <q-page class="items-center">
    
    <q-btn @click="loadData" type="submit" icon="shopping_cart">TEST API</q-btn>
  </q-page>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageIndex',
  
  setup() {

    const data = ref()

    function loadData () {
    api.get('/listUsers')
      .then((response) => {
        data.value = response.data as string
        console.log(data.value)
      })
      .catch(() => {
        console.log('failed')
      })
  }

    
    return { data,loadData};
  }
});
</script>
