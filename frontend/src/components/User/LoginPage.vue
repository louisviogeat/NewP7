<template>
  <div class="form">
    <div class="form_item">
      <label>Email </label>
      <input v-model="email" />
    </div>
    <div class="form_item">
      <label>Mot de passe </label>
      <input type="password" v-model="password" />
    </div>
    <button @click="login()" class="success">Connexion</button>
  </div>
</template>

<script>
import UserService from "../../services/userService";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      UserService.login(this.email, this.password)
        .then((res) => {
          console.log("aa", res);
          this.$emit("logged", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang='scss'>
</style>