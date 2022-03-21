<template>
  <div>
    <div class="post_header">
      <p>
        Publié par {{ post.user.firstName }} {{ post.user.lastName }}
        {{ formattedDate }}
      </p>
      <h2>{{ post.text }}</h2>
    </div>

    <div>
      <input v-if="updatingPost" v-model="newtext" type="text" />
      <div>
        <button v-if="updatingPost" @click="updatePost(post)">
          Confirmer la modification
        </button>
        <button v-if="updatingPost" @click="cancelUpdatingPost(post)">
          Annuler la modification
        </button>
      </div>
    </div>

    <div class="post_buttons">
      <div class="post_buttons_like">
        <button class="likeDislike" @click="like(post.id)">
          <font-awesome-icon icon="face-laugh" />
        </button>
        <p>({{ post.likes }})</p>
      </div>
      <div class="post_buttons_like">
        <button class="likeDislike">
          <font-awesome-icon icon="face-frown-open" />
        </button>
        <p>({{ post.dislikes }})</p>
      </div>
      <button @click="openComment()">Commenter</button>
      <button v-if="user.id === post.userId" @click="openUpdatingPost()">
        Modifier
      </button>
      <button v-if="user.id === post.userId" @click="deletePost(post)">
        Supprimer
      </button>
    </div>
    <div v-if="commentPost">
      <create-comment :postId="post.id"></create-comment>
    </div>

    <div class="post_actionButton"></div>

    <div v-for="comment in post.comments" :key="comment.id" class="comment">
      <comment-component :comment="comment"></comment-component>
    </div>
  </div>
</template>

<script>
import HttpService from "../../services/httpService";
import CreateComment from "../Comment/CreateComment.vue";
import CommentComponent from "../Comment/CommentComponent.vue";
//import CreatePost from "../components/Post/CreatePost.vue";
import moment from "moment";

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
      newText: "",
      userId: "",
      formattedDate: "",
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("currentUserId"));
    console.log(this.userId);
    console.log(this.post);
    const date = new Date(this.post.createdAt).getTime();
    console.log(date.time);
    moment.updateLocale("en", {
      relativeTime: {
        future: "dans% s",
        past: "il y a% s",
        s: "quelques secondes",
        m: "une minute",
        mm: "% d minutes",
        h: "une heure",
        hh: "% d heures",
        d: "un jour",
        dd: "% d jours",
        M: "un mois",
        MM: "% d mois",
        y: "un an",
        aa: "% d ans",
      },
    });
    console.log(date);
    moment.locale("fr");
    console.log(Date.now());
    console.log(moment(Date.now()).fromNow());
    console.log(moment(date).fromNow());
    this.formattedDate = moment(date).fromNow();
  },
  methods: {
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
    updatePost(post) {
      console.log(post);
      const route = "post/" + post.id;
      const body = {
        text: this.newText,
        file: post.file,
        creatorId: post.userId,
      };
      console.log("a", body);
      HttpService.put(route, body).then(() => {
        this.updatingPost = false;
        this.componentKey += 1;
        this.$emit("postUpdated", true);
        alert("Post modifié");
      });
    },

    cancelUpdatingPost(post) {
      console.log(post);
      this.updatingPost = false;
    },
    deletePost(post) {
      console.log(post);
      const route = "post/" + post.id;
      const body = {
        creatorId: post.userId,
      };
      console.log("a", body);
      HttpService.delete(route, body)
        .then(() => {
          alert("Post supprimé");
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