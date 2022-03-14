class UserService {
    async login(email, password) {
        const route = "http://localhost:3000/api/user/login";
        const body = {
            email,
            password,
        };
        return fetch(route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                localStorage.setItem("currentUserId", JSON.stringify(res.userId));
                localStorage.setItem("token", JSON.stringify(res.token));
                return res.userId;
            });
    }

    async signup(user) {
        const route = "http://localhost:3000/api/user/signup";
        return fetch(route, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((user) => {
                localStorage.setItem("currentUserId", JSON.stringify(user.id));
                console.log('signup user', user);
                return user;
                /*
                this.login(user.email, user.password)
                    .then((res) => {
                        return res;
                    });
                */
            })
            .catch((err) => {
                console.error(err);
            });
    }


}
export default new UserService();