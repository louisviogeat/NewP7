<template>
  <div>
    <header v-if="user">
      <div class="userBar">
        <div class="userBar_profile">
          <img v-if="!user.profilePicture" src="./assets/profil.png" alt="" />
          <img v-if="user.profilePicture" :src="user.profilePicture" alt="" />
          <p>{{ user.firstName }} {{ user.lastName }}</p>
        </div>
        <div class="userBar_admin">
          <router-link to="/administration">Administration</router-link>
        </div>
      </div>

      <nav>
        <router-link to="/">Accueil</router-link> |
        <router-link to="/createPost">Créer un post</router-link> |
        <router-link to="/connexion">Connexion</router-link>
      </nav>
    </header>
    <router-view v-if="user" />

    <div v-if="!user">
      <h2>Connexion</h2>
      <connexion-view @authenticated="isAuthenticated"></connexion-view>
    </div>
  </div>
</template>

<script>
import ConnexionView from "./views/ConnexionView.vue";

export default {
  components: { ConnexionView },
  name: "App",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    isAuthenticated(payload) {
      this.user = payload;
      console.log("ého maintenant cest lui", this.user);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  .userBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3%;
    &_profile {
      display: flex;
    }
    &_admin {
    }
  }
  img {
    height: 50px;
    padding-right: 10px;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
