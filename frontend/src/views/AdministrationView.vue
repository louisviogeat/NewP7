<template>
  <div>
    <div>
      <button v-if="!user.isAdmin" @click="deleteUser(user)" class="danger">
        Supprimer mon compte
      </button>
    </div>
    <div v-if="user.isAdmin">
      <h1>Liste des utilisateurs</h1>
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
            <td>
              <button @click="deleteUser(user)" class="danger">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import HttpService from "../services/httpService";
export default {
  name: "AdministrationView",
  data() {
    return {
      user: "",
      users: [],
    };
  },
  mounted() {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    HttpService.get("user/" + userId).then((res) => {
      this.user = res;
    });
    this.getAllUser();
  },
  methods: {
    getAllUser() {
      HttpService.get("user").then((res) => {
        this.users = res;
      });
    },
    deleteUser(user) {
      const route = "user/" + user.id;
      const body = {
        isAdmin: user.isAdmin,
      };
      HttpService.delete(route, body)
        .then(() => {
          this.$router.push({ name: "reload" });
          setTimeout(() => {
            this.$router.push({ name: "administration" });
          }, 300);
        })
        .catch((err) => {
          console.error("delete user err", err);
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
  tbody {
    background-color: #42b983;
  }
  td {
    color: black;
  }
}
</style>