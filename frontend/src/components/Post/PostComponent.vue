<template>
  <div>
    <div class="post_header">
      <p>
        Publié par {{ post.user.firstName }} {{ post.user.lastName }}
        {{ formattedDate }}
      </p>
      <p v-if="formattedUpdatedDate">Modifié {{ formattedUpdatedDate }}</p>
      <h2>{{ post.text }}</h2>
    </div>

    <div>
      <input v-if="updatingPost" v-model="text" type="text" />
      <div>
        <button v-if="updatingPost" class="success" @click="updatePost(post)">
          Confirmer la modification
        </button>
        <button
          v-if="updatingPost"
          class="danger"
          @click="cancelUpdatingPost(post)"
        >
          Annuler la modification
        </button>
      </div>
    </div>

    <div class="post_buttons">
      <div class="post_buttons_like">
        <button class="likeDislike danger" @click="like(post.id)">
          <font-awesome-icon icon="face-laugh" />
        </button>
        <p>({{ post.likes }})</p>
      </div>
      <div class="post_buttons_like">
        <button class="likeDislike danger" @click="dislike(post.id)">
          <font-awesome-icon icon="face-frown-open" />
        </button>
        <p>({{ post.dislikes }})</p>
      </div>
      <button @click="openComment()" class="success">Commenter</button>
      <button
        v-if="user.id === post.userId"
        class="success"
        @click="openUpdatingPost()"
      >
        Modifier
      </button>
      <button
        v-if="user.id === post.userId"
        class="danger"
        @click="deletePost(post)"
      >
        Supprimer
      </button>
    </div>
    <div v-if="commentPost">
      <create-comment :postId="post.id"></create-comment>
    </div>

    <div class="post_actionButton"></div>

    <div v-for="comment in post.comments" :key="comment.id" class="comment">
      <comment-component
        :comment="comment"
        :user="user"
        @postUpdated="isUpdated"
      ></comment-component>
    </div>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
import CreateComment from "../Comment/CreateComment.vue";
import CommentComponent from "../Comment/CommentComponent.vue";
import MomentService from "../../services/momentService";

export default {
  components: { CreateComment, CommentComponent },
  name: "PostComponent",
  props: { post: Object, user: Object },
  data() {
    return {
      componentKey: 0,
      creationPost: false,
      updatingPost: false,
      commentPost: false,
      text: "",
      userId: "",
      formattedDate: "",
      formattedUpdatedDate: "",
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("currentUserId"));
    MomentService.dateFromNow(this.post.createdAt).then((date) => {
      this.formattedDate = date;
    });
    if (this.post.createdAt !== this.post.updatedAt) {
      MomentService.dateFromNow(this.post.updatedAt).then((date) => {
        this.formattedUpdatedDate = date;
      });
    }
  },
  methods: {
    isUpdated(payload) {
      this.$emit("postUpdated", payload);
    },
    openCreationPost() {
      this.creationPost = !this.creationPost;
    },
    openUpdatingPost() {
      this.updatingPost = !this.updatingPost;
    },
    openComment() {
      this.commentPost = !this.commentPost;
    },
    like(postId) {
      const route = "post/" + postId + "/like";
      const body = {
        userId: this.userId,
        like: 1,
      };
      HttpService.post(route, body)
        .then(() => {
          this.componentKey += 1;
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.log("errooooor", err);
        });
    },
    dislike(postId) {
      const route = "post/" + postId + "/dislike";
      const body = {
        userId: this.userId,
        dislike: 1,
      };
      HttpService.post(route, body)
        .then(() => {
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.log("errooooor", err);
        });
    },
    updatePost(post) {
      console.log(post);
      const route = "post/" + post.id;
      const body = {
        text: this.text,
        file: post.file,
        creatorId: post.userId,
      };
      console.log("a", body);
      HttpService.put(route, body).then(() => {
        this.$emit("postUpdated", true);
        //alert("Post modifié");
      });
    },

    cancelUpdatingPost(post) {
      console.log(post);
      this.updatingPost = false;
    },
    deletePost(post) {
      console.log(post);
      const route = "post/" + post.id;

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

<style lang="scss">
@import "../../main";
</style>