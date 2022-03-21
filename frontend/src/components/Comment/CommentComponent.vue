<template>
  <div>
    <p>Commenté par {{ comment.user.firstName }} {{ comment.user.lastName }}</p>
    <h3>{{ comment.text }}</h3>
    <div v-if="updatingComment">
      <input v-model="newtext" type="text" />
      <div>
        <button @click="updateComment(comment)">
          Confirmer la modification
        </button>
        <button @click="cancelUpdatingComment()">
          Annuler la modification
        </button>
      </div>
    </div>
    <div class="post_buttons">
      <button @click="openUpdatingComment()">Modifier</button>
      <button @click="deleteComment(comment)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
export default {
  name: "CommentComponent",
  props: { comment: Object },
  data() {
    return {
      updatingComment: false,
    };
  },
  methods: {
    openUpdatingComment() {
      this.updatingComment = !this.updatingComment;
    },
    cancelUpdatingComment() {
      this.updatingComment = !this.updatingComment;
    },
    updateComment(comment) {
      const route = "post/" + comment.postId + "/comment/" + comment.id;
      const body = {
        text: this.newText,
        file: comment.file,
        creatorId: comment.userId,
      };
      console.log("a", body);
      HttpService.put(route, body).then(() => {
        this.updatingComment = false;
        alert("Commentaire modifié");
      });
    },
    deleteComment(comment) {
      console.log(comment);
    },
  },
};
</script>

<style lang='scss'>
</style>