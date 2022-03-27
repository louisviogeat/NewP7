<template>
  <div class="all">
    <header v-if="user">
      <div class="userBar">
        <img
          class="logo-only"
          src="./assets/groupomania_Logos/logo-black.png"
          alt="logo"
        />
        <img
          class="logo-full"
          src="./assets/groupomania_Logos/icon-left-font-monochrome-black.svg"
          alt="logo"
        />

        <h1>{{ user.firstName }} {{ user.lastName }}</h1>
        <div class="header-buttons">
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
      screenWidth: window.screen.width,
    };
  },
  methods: {
    loggy() {
      console.log(window.screen.width);
    },
    isAuthenticated(payload) {
      this.user = payload;
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
</style>
