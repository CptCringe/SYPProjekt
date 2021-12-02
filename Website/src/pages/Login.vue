<template>
  <q-page class="items-center">
    <q-input v-model="email" filled type="email" hint="Email"/>

    <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      

    <q-btn @click="loadData" type="submit" icon="shopping_cart">Login</q-btn>
  </q-page>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageLogin',
  
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

    
    return { data,loadData,  isPwd: ref(true), email: ref('')};
  }
});
</script>
