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
                console.log('a', res);
                if (res.ok === true) {
                    return res.json();
                }
            })
            .then((res) => {
                console.log('b', res);
                localStorage.setItem("currentUserId", JSON.stringify(res.userId));
                localStorage.setItem("token", JSON.stringify(res.token));
                return res.userId;
            }).catch(() => {
                alert('Mauvais identifiants de connexion');
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
                    console.log('quand a');
                    return res.json();

                }
            })
            .then((signUpRes) => {
                console.log('quand b', signUpRes);
                const object = {
                    user: signUpRes,
                    pass: user
                };
                localStorage.setItem("currentUserId", JSON.stringify(signUpRes.id));
                return object;

            })
            .catch((err) => {
                console.error(err);
            });
    }


}
export default new UserService();