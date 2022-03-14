class PostService {
    async createPost(post) {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const route = "http://localhost:3000/api/user/" + user.id + "/post";

        fetch(route, {
            method: "POST",
            body: JSON.stringify(post),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((post) => {
                return post;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async displayAllPosts() {
        const urlApi = "http://localhost:3000/api/posts";
        return fetch(urlApi)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            });
    }

}
export default new PostService();