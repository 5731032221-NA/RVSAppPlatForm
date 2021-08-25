module.exports = {
    listrole: async function (accessToken, req) {
        return fetch('http://localhost:8082/listrole', {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then(async res => res.json())

    },
    postuser: async function (accessToken, req) {
        return fetch("http://localhost:8082/user-management/users", {
            method: "POST",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }).then(async (res) => res.json());
    },

    getuser: async function (accessToken) {
        return fetch("http://localhost:8082/user-management/users", {
            method: "GET",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
        }).then((data) => data.json());
    },
    getuserbyid: async function (accessToken, id) {
        return fetch(`http://localhost:8082/user-management/users/${id}`, {
            method: "GET",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
        }).then(async (res) => res.json());
    },

    updateuser: async function (accessToken, req, id) {
        return fetch(`http://localhost:8082/user-management/users/${id}`, {
            method: "PUT",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }).then(async (res) => res.json());
    },
};
