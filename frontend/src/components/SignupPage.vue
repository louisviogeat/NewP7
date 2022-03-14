<template>
  <div class="form">
    <div class="form_item">
      <p>Prénom</p>
      <input v-model="firstName" />
    </div>
    <div class="form_item">
      <p>Nom</p>
      <input v-model="lastName" />
    </div>
    <div class="form_item">
      <p>Email</p>
      <input v-model="email" type="email" />
    </div>
    <div class="form_item">
      <p>Mot de passe</p>
      <input v-model="password" type="password" />
    </div>
    <div class="form_item">
      <p>Photo de profil</p>
      <upload-image @imageUploaded="profilePicture"></upload-image>
    </div>

    <button @click="signup()">S'inscrire</button>
  </div>
</template>

<script>
import UserService from "../services/userService";
import UploadImage from "./UploadImage.vue";
export default {
  components: { UploadImage },
  name: "SignupPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: "",
    };
  },
  methods: {
    signup() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        profilePicture: this.profilePicture,
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
.form {
  border: 1px solid darkblue;
  &_item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>