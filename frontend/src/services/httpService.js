class HttpService {
    apiUrl = "http://localhost:3000/api/";
    token = JSON.parse(localStorage.getItem("token"));
    currentUserId = localStorage.getItem('currentUserId');

    async handleError(error) {
        console.log('handleError', error);
    }

    async get(route) {
        console.log('jappelle la route', route);
        console.log('avec le token', this.token);
        return fetch(this.apiUrl + route, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
    }

    async post(route, body) {
        return fetch(this.apiUrl + route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
    }

    async put(route, body) {
        this.get('user/' + this.currentUserId).then((user) => {
            body.isAdmin = user.isAdmin;
            body.userConnected = user.id;
            console.log('b', body);
            return fetch(this.apiUrl + route, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
        })
        // send isAdmin, userConnected and creatorId (for post)

    }

    async delete(route, body) {
        return this.get('user/' + this.currentUserId).then((user) => {
            console.log('hoo', user);
            body.isAdmin = user.isAdmin;
            body.userConnected = user.id;
            return fetch(this.apiUrl + route, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
        });
    }

}

export default new HttpService();