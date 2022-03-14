<template>
  <div>
    <button @click="openComment()">Commenter</button>
    <div v-if="cardOpened" class="new-comment">
      <div class="new-comment_item">
        <p>Commentaire :</p>
        <input v-model="text" type="text" />
      </div>
      <button @click="createComment">Répondre</button>
    </div>
  </div>
</template>

<script>
import HttpService from "../services/httpService";
export default {
  name: "createComment",
  props: { postId: Number },
  data() {
    return {
      text: "",
      cardOpened: false,
    };
  },
  methods: {
    createComment() {
      const userId = localStorage.getItem("currentUserId");
      const route = "user/" + userId + "/post/" + this.postId + "/comment";
      const comment = {
        text: this.text,
        file: "",
      };
      HttpService.post(route, comment).then((res) => {
        console.log("comment ", res);
      });
    },
    openComment() {
      this.cardOpened = !this.cardOpened;
    },
  },
};
</script>

<style lang="scss">
.new-comment {
  border: 2px solid green;
  &_item {
    width: 100%;
    display: flex;
    justify-content: space-around;
    & :nth-child(1) {
      flex: 1;
    }
    & :nth-child(2) {
      flex: 3;
    }
  }
}
</style>