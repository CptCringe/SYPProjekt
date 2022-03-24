<template>
  <div id="app">
    <nav class="navbar navbar-expand  " >
      <a href="/" class="navbar-brand" style="font-size: 35px">VocaBattle</a>
      <div class="navbar-nav mr-auto" >
        <li class="nav-item">
          <router-link to="/home" class="nav-link" >
            <font-awesome-icon icon="home" style="font-size: 100%"/> Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/vocablists" class="nav-link">Vocablists</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link" style="font-size: 25px">
            <font-awesome-icon icon="user-plus" style="font-size: 25px" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" style="font-size: 25px">
            <font-awesome-icon icon="sign-in-alt" style="font-size: 25px" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/friends" class="nav-link">
            <font-awesome-icon icon="user-friends" />
            Friends
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('moderator');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>

  nav {
    background-color: orange;
  }
  li{
    font-size: 150%;
    color: black;
  }

  a.nav-link{
    color: black;
    color:black;
    transition: all .4s ease;
  }
  a.navbar-brand{
    color:black;
    transition: all .4s ease;
  }

  a.nav-link:hover{
    color: white;
  }
  a.navbar-brand:hover{
    color:white;
  }


</style>