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
      <p>Publié par {{ post.user.firstName }} {{ post.user.lastName }}</p>
      <h2>{{ post.text }}</h2>
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

      <div class="post_buttons" :key="postKey">
        <button class="likeDislike" @click="like(post.id)">
          <font-awesome-icon icon="face-laugh" />
        </button>
        <p>({{ post.likes }})</p>
        <button class="likeDislike">
          <font-awesome-icon icon="face-frown-open" />
        </button>
        <p>({{ post.dislikes }})</p>
      </div>
      <div class="post_actionButton">
        <create-comment :postId="post.id"></create-comment>
        <button @click="openUpdatingPost()">Modifier</button>
        <button @click="deletePost(post)">Supprimer</button>
      </div>

      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <h3>{{ comment.text }}</h3>
        <p>
          Commenté par {{ comment.user.firstName }} {{ comment.user.lastName }}
        </p>
        <div class="comment_buttons">
          <button class="likeDislike">
            <font-awesome-icon icon="face-laugh" />
          </button>
          <p>({{ post.likes }})</p>
          <button class="likeDislike">
            <font-awesome-icon icon="face-frown-open" />
          </button>
          <p>({{ post.dislikes }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpService from "../services/httpService";
import CreatePost from "../components/CreatePost.vue";
import CreateComment from "../components/CreateComment.vue";
export default {
  components: { CreateComment, CreatePost },
  name: "HomeView",
  data() {
    return {
      posts: [],
      postKey: 0,
      creationPost: false,
      updatingPost: false,
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
    openCreationPost() {
      this.creationPost = !this.creationPost;
    },
    openUpdatingPost() {
      this.updatingPost = !this.updatingPost;
    },
    like(postId) {
      const route = "post/" + postId + "/like";
      const body = {
        userId: JSON.parse(localStorage.getItem("currentUserId")),
        like: 1,
      };
      HttpService.post(route, body)
        .then(() => {
          this.postKey += 1;
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
        })
        .catch((err) => {
          console.log("berr", err);
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