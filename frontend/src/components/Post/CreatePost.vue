<template>
  <div>
    <div class="post-creation">
      <p>Titre</p>
      <input v-model="text" type="text" />
    </div>
    <div class="post-creation" v-if="!file">
      <p>Fichier</p>
      <input
        @change="onFileChange"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
      />
    </div>
    <div class="post-creation" v-else>
      <img :src="file" />
      <button @click="removeImage">Supprimer le fichier</button>
    </div>
    <button @click="createPost" class="success">Créer</button>
  </div>
</template>

<script>
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
      const post = {
        text: this.text,
        file: this.file,
      };

      HttpService.post(route, post).then(() => {
        console.log("ici");
        this.$emit("postUpdated", true);
      });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.file = "";
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

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>