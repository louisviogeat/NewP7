<template>
  <div>
    <label>Page d'accueil</label>
    <div>
      <button @click="displayAllPosts()">Afficher tous les posts</button>
      <button @click="loggy()">Log</button>
      <button @click="openCreationPost()">Créer un post</button>
    </div>
    <div class="post" v-if="creationPost">
      <create-post></create-post>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
      <post-component :post="post"></post-component>
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
      posts: [],
      creationPost: false,
      newText: "",
    };
  },
  methods: {
    loggy() {
      console.log(this.posts);
    },
    displayAllPosts() {
      HttpService.get("posts").then((res) => {
        res.forEach((post) => {
          this.posts.push(post);
        });
      });
    },
  },
};
</script>

<style lang="scss">
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