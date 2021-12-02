<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/120093.png">
          </q-avatar>
          VocaBattle Login
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import {defineComponent, ref } from 'vue'

export default defineComponent({
name: 'MainLayout',

  components: {
  },

  setup () {

    return {

    }
  }
})
</script>
