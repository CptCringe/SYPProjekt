<template>
  <q-page class="items-center">
    <div style="padding-top: 15%">
      <q-card style="width: 20%; margin:auto; padding-bottom: 2%; padding-top: 2%;">
        
        <q-input style="width: 80%; margin:auto" v-model="email" filled type="email" hint="Email"/>
        
        <q-input style="width: 80%; margin:auto; padding-top: 1%" v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        <div style="padding-top: 3%">
          <q-btn style="margin:auto; width:40%; left:30%" @click="login" type="submit" align="around" icon="login">Login</q-btn>
        </div>  

        <div style="padding-top: 3%">
          <q-btn style="margin:auto; width:30%; left:35%" @click="signUp" type="submit" align="around" >Sign Up</q-btn>
        </div>  

      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import router from '../router/index';

export default defineComponent({
  name: 'PageLogin',
  email: ref(''),

  setup() {

    const data = ref()

    function signUp () {
        const fabian = 0;
    }
    
    function login () {
      
      api.post('/login')
        .then((response) => {
          data.value = response.data as string
          console.log(data.value)
        })
        .catch(() => {
          console.log('failed')
        })
    }

    
    return { data,login,signUp,  isPwd: ref(true), email: ref(''),password: ref('')};
  }
});
</script>
