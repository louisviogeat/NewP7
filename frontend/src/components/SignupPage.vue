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
    <button @click="signup()">S'inscrire</button>
    <button @click="goTo()">Aller</button>
  </div>
</template>

<script>
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
      const route = "http://localhost:3000/api/user/signup";
      const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        profilePicture: "",
        isAdmin: "false",
      };
      console.log(JSON.stringify(body));
      fetch(route, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          console.log(document.location.href);
          window.location.href = "/homePage";
        });
    },
    goTo() {
      console.log(document.location.href);
      window.location.href = "/homePage";
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