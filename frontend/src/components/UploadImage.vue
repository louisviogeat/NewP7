<template>
  <div>
    <div>
      <div class="col-8">
        <label class="btn btn-default p-0">
          <input
            type="file"
            accept="image/*"
            ref="file"
            @change="selectImage"
          />
        </label>
      </div>
    </div>
    <div v-if="previewImage">
      <div class="preview">
        <img class="preview_image" :src="previewImage" alt="" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.preview {
  border: 2px solid green;
  width: 100%;
  &_image {
    width: 100px;
    object-fit: cover;
  }
}
</style>
<script>
//import UploadService from "../services/uploadFilesService";
export default {
  name: "upload-image",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,
    };
  },
  methods: {
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      console.log(this.currentImage);
      this.$emit("imageUploaded", this.currentImage);
    },
  },
};
</script>