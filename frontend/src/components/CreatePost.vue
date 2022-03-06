<template>
  <div>
    <div>
      <p>Titre</p>
      <input v-model="text" type="text" />
    </div>
    <div>
      <p>Contenu</p>
      <upload-image></upload-image>
    </div>
  </div>
</template>

<script>
import UploadImage from "./UploadImage.vue";
export default {
  name: "createPost",
  components: {
    UploadImage,
  },
};
</script>

<style>
</style>