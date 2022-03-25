<template>
  <div class="all">
    <header v-if="user">
      <div class="userBar">
        <div class="userBar_profile">
          <img
            src="./assets/groupomania_Logos/icon-left-font-monochrome-black.svg"
            alt="logo"
          />
        </div>
        <h1>{{ user.firstName }} {{ user.lastName }}</h1>
        <button
          @click="goToAdministrationPage()"
          v-if="user.isAdmin && $route.name !== 'administration'"
          class="success"
        >
          Administration
        </button>
        <button
          @click="goToHomePage()"
          v-if="user.isAdmin && $route.name === 'administration'"
          class="success"
        >
          Accueil
        </button>

        <button @click="deconnexion()" class="danger">Déconnexion</button>
      </div>
    </header>
    <router-view v-if="user" />

    <div v-if="!user">
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
    goToHomePage() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
@import "./main";

body {
  background-color: $bg;
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
    img {
      height: 50px;
    }
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
