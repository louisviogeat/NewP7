<template>
  <div>
    <div class="post-creation">
      <p>Titre</p>
      <input v-model="text" type="text" />
    </div>
    <button @click="createPost">Créer</button>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
export default {
  name: "createPost",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    createPost() {
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      const route = "user/" + userId + "/post";
      const post = {
        text: this.text,
      };

      HttpService.post(route, post).then(() => {
        console.log("ici");
        this.$router.go();
      });
    },
  },
};
</script>

<style lang='scss'>
.post-creation {
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    padding: 5px;
  }
}
</style>