<template>
  <div>
    <label>Page d'accueil</label>
    <div>
      <button @click="displayAllPosts()">Afficher tous les posts</button>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>{{ post.text }}</h2>
      <p>Publié par {{ post.user.firstName }} {{ post.user.lastName }}</p>
      <img src="" alt="" />

      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <h3>{{ comment.text }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    displayAllPosts() {
      const urlApi = "http://localhost:3000/api/posts";
      fetch(urlApi)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          res.forEach((post) => {
            console.log(post);
            this.posts.push(post);
          });
        });
    },
  },
};
</script>

<style>
.post {
  border: 1px solid darkblue;
  padding: 2%;
  margin: 2%;
}

.comment {
  border: 1px solid rebeccapurple;
}
</style>