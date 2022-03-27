<template>
  <div>
    <div class="connexion">
      <img
        src="../assets/groupomania_Logos/icon-left-font-monochrome-white.svg"
        alt=""
      />
      <div class="connexion_tabs">
        <button id="btnSignIn" @click="openTab('sign-in')">Déjà inscrit</button>
        <button class="extend" id="btnSignUp" @click="openTab('sign-up')">
          Inscription
        </button>
      </div>
      <div class="connexion_page">
        <signup-page id="sign-up" @logged="isLogged" />
        <login-page id="sign-in" @logged="isLogged" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from "../components/User/LoginPage.vue";
import SignupPage from "../components/User/SignupPage.vue";
import HttpService from "../services/httpService";
export default {
  components: { SignupPage, LoginPage },
  name: "ConnexionPage",
  props: {
    msg: String,
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      apiUrl: "http://localhost:3000/api/user",
    };
  },
  mounted() {
    const signUp = document.getElementById("sign-up");
    const signIn = document.getElementById("sign-in");
    const btnSignIn = document.getElementById("btnSignIn");
    btnSignIn.classList.add("active");
    signUp.style.display = "none";
    signIn.style.display = "block";
  },
  methods: {
    openTab(tabName) {
      const signUp = document.getElementById("sign-up");
      const signIn = document.getElementById("sign-in");
      const btnSignUp = document.getElementById("btnSignUp");
      const btnSignIn = document.getElementById("btnSignIn");
      const tabActive = document.getElementsByClassName("active");
      tabActive[0].classList.remove("active");
      switch (tabName) {
        case "sign-in":
          signUp.style.display = "none";
          signIn.style.display = "block";
          btnSignIn.classList.add("active");
          break;
        case "sign-up":
          signIn.style.display = "none";
          signUp.style.display = "block";
          btnSignUp.classList.add("active");
          break;
        default:
          break;
      }
    },
    isLogged(payload) {
      const route = "user/" + payload;
      HttpService.get(route).then((res) => {
        this.$router.push({ name: "home" });
        this.$emit("authenticated", res);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss scoped>
@import "../main";
</style>
