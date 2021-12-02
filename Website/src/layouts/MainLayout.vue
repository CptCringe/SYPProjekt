<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/120093.png">
          </q-avatar>
          VocaBattle
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer 
        show-if-above  
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="150"
        :breakpoint="500" 
        v-model="leftDrawerOpen" 
        side="left" bordered>
      <q-list>
        

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  
  {
    title: 'Jira',
    icon: 'done',
    link: 'https://ctpburger.atlassian.net/jira/software/projects/VOC/boards/1'
  }
];

import {defineComponent, ref } from 'vue'

export default defineComponent({
name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      miniState: ref(true),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

    }
  }
})
</script>
