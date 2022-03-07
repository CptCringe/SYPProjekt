<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
      <button class="btn-outline-">
        <router-link to="/editProfile" class="nav-link">
          <font-awesome-icon icon="user"/>
          Edit
        </router-link>
      </button>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>

<script>
export default {           // TODO auflisten der Roles fixen
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
  button {
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: #505050;
    color: white;
    padding: 5px 8px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;

    transition: all .4s ease;
  }

  button a{
    color: white;
  }

  button:hover {
    background-color: #202020;
  }

  button svg {
    margin-right: 10px;
  }
</style>