<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <button @click="getAllUser()">Ouvrir la liste</button>
    <table v-if="users">
      <thead>
        <tr>
          <th>id</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Admin</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin }}</td>
          <td><button @click="deleteUser(user)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HttpService from "../services/httpService";
export default {
  name: "AdministrationView",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUser() {
      HttpService.get("user").then((res) => {
        this.users = res;
      });
    },
    deleteUser(user) {
      console.log(user);
      const route = "user/" + user.id;
      const body = {
        isAdmin: user.isAdmin,
      };
      HttpService.delete(route, body)
        .then((res) => {
          console.log("delete user res", res);
        })
        .catch((err) => {
          console.log("delete user err", err);
        });
    },
  },
};
</script>

<style lang='scss'>
table {
  width: 100%;
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
  }
}
</style>