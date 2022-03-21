<template>
  <div class="form">
    <div class="form_item">
      <label>Prénom</label>
      <input v-model="firstName" />
    </div>
    <div class="form_item">
      <label>Nom</label>
      <input v-model="lastName" />
    </div>
    <div class="form_item">
      <label>Email</label>
      <input v-model="email" type="email" />
    </div>
    <div class="form_item">
      <label>Mot de passe</label>
      <input v-model="password" type="password" />
    </div>

    <button @click="signup()">S'inscrire</button>
  </div>
</template>

<script>
import UserService from "../../services/userService";
export default {
  name: "SignupPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        isAdmin: "false",
      };
      console.log(user);
      UserService.signup(user).then((res) => {
        this.$emit("logged", res.id);
      });
    },
  },
};
</script>

<style lang="scss">
</style>