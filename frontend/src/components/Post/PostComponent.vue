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
          @click="cancelUpdatingPost()"
        >
          Annuler la modification
        </button>
      </div>
    </div>

    <div class="post_buttons">
      <div class="post_buttons_like">
        <button
          :style="[alreadyLiked ? { color: '#4ECDC4' } : { color: 'white' }]"
          class="likeDislike danger"
          @click="like(post.id)"
        >
          <font-awesome-icon icon="face-laugh" />
        </button>
        <p>({{ likesNumber }})</p>
      </div>
      <div class="post_buttons_like">
        <button
          :style="[alreadyDisliked ? { color: '#FF6B6B' } : { color: 'white' }]"
          class="likeDislike danger"
          @click="dislike(post.id)"
        >
          <font-awesome-icon icon="face-frown-open" />
        </button>
        <p>({{ dislikesNumber }})</p>
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
      <create-comment
        :postId="post.id"
        @postUpdated="isUpdated"
      ></create-comment>
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
      creationPost: false,
      updatingPost: false,
      commentPost: false,
      text: "",
      userId: "",
      formattedDate: "",
      formattedUpdatedDate: "",
      likesNumber: 0,
      dislikesNumber: 0,
      alreadyLiked: false,
      alreadyDisliked: false,
    };
  },
  beforeMount() {
    const index = this.post.likesOrDislikes.findIndex(
      (like) => like.userId === this.user.id
    );
    if (this.post.likesOrDislikes[index] === undefined) {
      return;
    } else {
      if (this.post.likesOrDislikes[index].isALike === true) {
        this.alreadyLiked = true;
        this.alreadyDisliked = false;
      } else {
        this.alreadyLiked = false;
        this.alreadyDisliked = true;
      }
    }
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
    this.post.likesOrDislikes.forEach((like) => {
      if (like.isALike === true) {
        this.likesNumber++;
      } else {
        this.dislikesNumber++;
      }
    });
  },
  methods: {
    changeLikeButtonStyle() {
      const likeBtn = document.getElementById("likeBtn");
      const alreadyLiked = this.post.likesOrDislikes.some(
        (like) => like.userId === this.user.id
      );
      if (alreadyLiked) {
        if (likeBtn.classList.contains("alreadyLike")) {
          return;
        } else {
          likeBtn.classList.add("alreadyLike");
        }
      } else {
        if (likeBtn.classList.contains("alreadyLike")) {
          likeBtn.classList.remove("alreadyLike");
        } else {
          return;
        }
      }
    },
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
        like: true,
      };
      HttpService.post(route, body)
        .then(() => {
          console.log(this.post);
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.error("like error", err);
        });
    },
    dislike(postId) {
      const route = "post/" + postId + "/like";
      const body = {
        like: false,
      };
      HttpService.post(route, body)
        .then(() => {
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.error("dislike error", err);
        });
    },
    updatePost(post) {
      const route = "post/" + post.id;
      const body = {
        text: this.text,
        file: post.file,
        creatorId: post.userId,
      };
      HttpService.put(route, body).then(() => {
        this.$emit("postUpdated", true);
      });
    },

    cancelUpdatingPost() {
      this.updatingPost = false;
    },
    deletePost(post) {
      const route = "post/" + post.id;

      HttpService.delete(route)
        .then(() => {
          this.$emit("postUpdated", true);
        })
        .catch((err) => {
          console.error("delete post", err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../main";
</style>