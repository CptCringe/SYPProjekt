<template>
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
        <q-btn style="margin:auto; width:40%; left:30%" @click="signup" type="submit" align="around" icon="login">Sign Up</q-btn>
      </div>

      <div style="padding-top: 3%">
        <q-btn style="margin:auto; width:30%; left:35%" @click="logIn" align="around" >Sign Up</q-btn>
      </div>

    </q-card>
  </div>
</template>

<script>
export default {
  name: 'SignUp'
};
</script>

<style scoped>

</style>
