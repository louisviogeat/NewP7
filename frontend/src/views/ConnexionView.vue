<template>
  <div class="connexion">
    <div class="connexion_buttons">
      <button @click="isLogin = true">Déjà inscrit</button>
      <button @click="isLogin = false">Inscription</button>
    </div>
    <signup-page v-if="!isLogin" @logged="isLogged" />
    <login-page v-if="isLogin" @logged="isLogged" />
    <font-awesome-icon icon="user-secret" />
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
  methods: {
    isLogged(payload) {
      const route = "user/" + payload;
      HttpService.get(route).then((res) => {
        this.$router.push({ name: "home" });
        this.$emit("authenticated", res);
      });
    },
    //openTab(tab) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss scoped>
.connexion {
  border: 2px solid blue;
  &_buttons {
    display: flex;
    justify-content: space-around;
    button {
      width: 100%;
    }
  }
}
</style>
