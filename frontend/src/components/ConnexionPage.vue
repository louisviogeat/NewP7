<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <label>Email </label>
      <input v-model="email" />
    </div>
    <div>
      <label>Mot de passe </label>
      <input v-model="password" />
    </div>
    <button @click="signup()">S'inscrire</button>
    <button @click="login()">Connexion</button>
  </div>
</template>

<script>
export default {
  name: "ConnexionPage",
  props: {
    msg: String,
  },
  data() {
    return {
      email: "",
      password: "",
      apiUrl: "http://localhost:3000/api/user",
    };
  },
  methods: {
    login() {
      const route = this.apiUrl + "/login";
      const body = {
        email: this.email,
        password: this.password,
      };
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
        .then((res) => {
          console.log(res);
          //console.log(document.location.href);
          //window.location.href = "/homePage";
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
