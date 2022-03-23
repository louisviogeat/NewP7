<template>
  <div class="all">
    <header v-if="user">
      <div class="userBar">
        <div class="userBar_profile">
          <img v-if="!user.profilePicture" src="./assets/profil.png" alt="" />
          <img v-if="user.profilePicture" :src="user.profilePicture" alt="" />
          <h1>{{ user.firstName }} {{ user.lastName }}</h1>
        </div>

        <button
          @click="goToAdministrationPage()"
          v-if="user.isAdmin"
          class="success"
        >
          Administration
        </button>
        <button @click="deconnexion()" class="danger">Déconnexion</button>
      </div>
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
    deconnexion() {
      this.user = "";
    },
    goToAdministrationPage() {
      this.$router.push({ name: "administration" });
    },
  },
};
</script>

<style lang="scss">
@import "./main";

body {
  background-color: $bg;
}

.all {
  //background-image: url("./assets/background.jpeg");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  //background-image: url("./assets/background.jpeg");
}

header {
  background-color: #ffe66d;
  box-shadow: 0px 1px 10px 1px #ffe66d;
  margin-bottom: 5%;
  h1 {
    color: black;
  }
  .userBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3%;

    &_profile {
      display: flex;
      align-items: center;
    }
    &_admin {
      display: flex;
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
