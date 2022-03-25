<template>
  <div class="new-comment">
    <div class="new-comment_item">
      <p>Commentaire :</p>
      <input v-model="text" type="text" />
    </div>
    <button @click="createComment" class="success">Répondre</button>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
export default {
  name: "createComment",
  props: { postId: Number },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    createComment() {
      const userId = localStorage.getItem("currentUserId");
      const route = "user/" + userId + "/post/" + this.postId + "/comment";
      const comment = {
        text: this.text,
        file: "",
      };
      HttpService.post(route, comment).then(() => {
        this.$emit("postUpdated", true);
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../main";
</style>