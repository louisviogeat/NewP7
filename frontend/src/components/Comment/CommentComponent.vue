<template>
  <div>
    <div class="post_header">
      <p>
        Commenté par {{ comment.user.firstName }} {{ comment.user.lastName }}
        {{ formattedDate }}
      </p>
      <p v-if="formattedUpdatedDate">Modifié {{ formattedUpdatedDate }}</p>
      <h3>{{ comment.text }}</h3>
    </div>

    <div v-if="updatingComment">
      <input v-model="text" type="text" />
      <div>
        <button @click="updateComment(comment)" class="success">
          Confirmer la modification
        </button>
        <button @click="cancelUpdatingComment()" class="danger">
          Annuler la modification
        </button>
      </div>
    </div>
    <div class="post_buttons" v-if="user.id === comment.userId">
      <button @click="openUpdatingComment()" class="success">Modifier</button>
      <button @click="deleteComment(comment)" class="danger">Supprimer</button>
    </div>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
import MomentService from "../../services/momentService";

export default {
  name: "CommentComponent",
  props: { comment: Object, user: Object },
  data() {
    return {
      updatingComment: false,
      formattedDate: "",
      formattedUpdatedDate: "",
      text: "",
    };
  },
  mounted() {
    MomentService.dateFromNow(this.comment.createdAt).then((date) => {
      this.formattedDate = date;
    });
    if (this.comment.createdAt !== this.comment.updatedAt) {
      MomentService.dateFromNow(this.comment.updatedAt).then((date) => {
        this.formattedUpdatedDate = date;
      });
    }
  },
  methods: {
    openUpdatingComment() {
      this.updatingComment = !this.updatingComment;
    },
    cancelUpdatingComment() {
      this.updatingComment = !this.updatingComment;
    },
    updateComment(comment) {
      const route = "/comment/" + comment.id;
      console.log("newtext", this.text);
      const body = {
        text: this.text,
      };
      console.log("a", body);
      HttpService.put(route, body).then(() => {
        this.updatingComment = false;
        this.$emit("postUpdated", true);
      });
    },
    deleteComment(comment) {
      const route = "comment/" + comment.id;
      HttpService.delete(route)
        .then(() => {
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.log("berr", err);
        });
    },
  },
};
</script>

<style lang='scss'>
</style>