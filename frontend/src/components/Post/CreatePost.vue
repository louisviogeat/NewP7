<template>
  <div>
    <form
      @submit.prevent="sendFile"
      enctype="multipart/form-data"
      class="post-creation"
    >
      <div class="field">
        <label for="text">Titre</label>
        <input v-model="text" type="text" />
      </div>
      <div class="field">
        <label for="file" class="label">Charger un fichier</label>
        <input type="file" ref="file" @change="selectFile" />
      </div>
      <div class="field">
        <button class="button is-info">Send</button>
      </div>
    </form>
    <button @click="createPost" class="success">Créer</button>
  </div>
</template>

<script>
import axios from "axios";
import HttpService from "../../services/httpService";
export default {
  name: "createPost",
  data() {
    return {
      text: "",
      file: "",
    };
  },
  methods: {
    createPost() {
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      const route = "user/" + userId + "/post";
      const formData = new FormData();
      formData.append("file", this.file);
      const post = {
        text: this.text,
        file: formData,
      };

      HttpService.post(route, post).then(() => {
        this.$emit("postUpdated", true);
      });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },

    async sendFile() {
      console.log("a", this.file);
      const formData = new FormData();
      formData.append("file", this.file);
      console.log("b", formData.get("file"));
      try {
        await axios.post("http://localhost:3000/api/upload", formData);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang='scss'>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    padding: 5px;
  }
}
</style>