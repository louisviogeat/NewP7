<template>
  <div>
    <div class="post-creation">
      <p>Titre</p>
      <input v-model="text" type="text" />
    </div>
    <div class="post-creation">
      <p>Contenu</p>
      <upload-image @imageUploaded="imageIsUploaded"></upload-image>
    </div>
    <button @click="createPost">Créer un post</button>
  </div>
</template>

<script>
import UploadImage from "../UploadImage.vue";
import HttpService from "../../services/httpService";
export default {
  name: "createPost",
  components: {
    UploadImage,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    imageIsUploaded(payload) {
      console.log("payload", payload);
    },
    createPost() {
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      const route = "user/" + userId + "/post";
      const post = {
        text: this.text,
        file: "",
      };

      HttpService.post(route, post).then(() => {
        this.$router.push({ name: "home" });
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