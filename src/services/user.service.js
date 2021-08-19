

module.exports = {
    postuser: async function (accessToken,req) {
        return fetch('http://localhost:8082/user-management/users', {
            method: 'POST',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then(async res => res.json())

    },
    getuser: async function (accessToken) {
        return fetch('http://localhost:8082/user-management/users', {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            },

        })
            // .then(data => data.json())
            .then(data => data.json())

    }
}