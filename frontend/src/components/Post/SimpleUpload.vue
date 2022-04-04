<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div
      v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
      <div class="message-body">{{ message }}</div>
    </div>
    <div class="field">
      <input type="file" ref="file" @change="selectFile" />
    </div>
    <div class="field" v-if="file">
      <button class="button success">Modifier l'image</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "SimpleUpload",
  data() {
    return {
      file: "",
      message: "",
      error: false,
    };
  },
  methods: {
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
    async sendFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        axios.post("http://localhost:3000/api/upload", formData).then((res) => {
          console.log("img", res);
          this.$emit("imageUpdated", res.data.file.path);
        });
        this.message = "Le fichier a bien été importé";
        this.file = "";
        this.error = false;
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../main";
form {
  display: flex;
  justify-content: center;
  align-items: space-around;
  padding: 10px;
  & field {
    padding: 5px;
  }
}
</style>