<template>
  <div>
    <div>
      <label>Email </label>
      <input v-model="email" />
    </div>
    <div>
      <label>Mot de passe </label>
      <input v-model="password" />
    </div>
    <button @click="login()">Connexion</button>
  </div>
</template>

<script>
import UserService from "../services/userService";
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
          this.$emit("logged", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>