

module.exports = async function (accessToken) {
    return fetch('http://localhost:8082/menuproperty', {
        method: 'GET',
        headers: {
            'Authorization':accessToken,
            'Content-Type': 'application/json'
        },

    })
        // .then(data => data.json())
        .then(data => data.json())

}
