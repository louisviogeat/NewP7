<template>
  <div v-if="!update">
    <div>
      <button @click="openCreationPost()" class="success">Créer un post</button>
    </div>
    <div class="post" v-if="creationPost">
      <create-post @postUpdated="isUpdated"></create-post>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
      <post-component
        @postUpdated="isUpdated"
        :post="post"
        :user="user"
        :key="componentKey"
      ></post-component>
    </div>
  </div>
</template>

<script>
import HttpService from "../services/httpService";
import PostComponent from "../components/Post/PostComponent.vue";
import CreatePost from "../components/Post/CreatePost.vue";
export default {
  components: { PostComponent, CreatePost },
  name: "HomeView",
  data() {
    return {
      update: false,
      posts: [],
      creationPost: false,
      newText: "",
      user: {},
      componentKey: 0,
    };
  },
  mounted() {
    const userId = JSON.parse(localStorage.getItem("currentUserId"));
    HttpService.get("user/" + userId).then((res) => {
      this.user = res;
    });
    this.displayAllPosts();
  },
  methods: {
    isUpdated() {
      this.$router.push({ name: "reload" });
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 1000);
    },
    displayAllPosts() {
      HttpService.get("posts").then((res) => {
        res.forEach((post) => {
          this.posts.push(post);
        });
      });
    },
    openCreationPost() {
      this.creationPost = true;
    },
  },
};
</script>

<style lang="scss">
@import "../main";
</style>