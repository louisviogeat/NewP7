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
    <div class="comment_buttons">
      <button class="likeDislike">
        <font-awesome-icon icon="face-laugh" />
      </button>
      <p>({{ comment.likes }})</p>
      <button class="likeDislike">
        <font-awesome-icon icon="face-frown-open" />
      </button>
      <p>({{ comment.dislikes }})</p>
    </div>
    <div class="post_actionButton">
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
.post {
  border: 1px solid darkblue;
  padding: 2%;
  margin: 2%;
  &_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_actionButtons {
    display: flex;
  }
}

.likeDislike {
  //border: none;
  //background: none;
  color: rgb(105, 174, 2);
}

.comment {
  border: 1px solid rebeccapurple;
  &_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>