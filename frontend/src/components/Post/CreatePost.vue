<template>
  <div>
    <form
      @submit.prevent="createPost"
      enctype="multipart/form-data"
      class="post-creation"
    >
      <div class="field">
        <label for="text">Titre</label>
        <input v-model="text" type="text" />
      </div>

      <div
        v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-success'}`"
      >
        <div class="message-body">{{ message }}</div>
      </div>
      <div class="field">
        <label for="file" class="label">Upload File</label>
        <input type="file" ref="file" @change="selectFile" />
      </div>
      <div class="field">
        <button class="button success">Créer</button>
      </div>
    </form>
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
      message: "",
      error: false,
    };
  },
  methods: {
    async createPost() {
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      const route = "user/" + userId + "/post";
      if (this.file) {
        const formData = new FormData();
        formData.append("file", this.file);

        try {
          axios
            .post("http://localhost:3000/api/upload", formData)
            .then((res) => {
              const fileObject = res.data.file;
              const post = {
                text: this.text,
                file: fileObject.path,
              };
              HttpService.post(route, post).then(() => {
                this.$emit("postUpdated", true);
              });
            });
        } catch {
          console.error("Erreur importation image");
        }
      } else {
        const post = {
          text: this.text,
        };
        HttpService.post(route, post).then(() => {
          this.$emit("postUpdated", true);
        });
      }
    },
    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image//gif"];
      const MAX_SIZE = 200000;
      const toolarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type)) {
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = toolarge
          ? `Image trop lourde. La taille maximale est ${MAX_SIZE / 1000}Kb`
          : "Seul les images sont autorisées";
      }
    },
  },
};
</script>

<style lang='scss'>
@import "../../main";
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  padding: 10px;
  & .field {
    padding: 5px;
  }
}
</style>