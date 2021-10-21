

module.exports = async function (accessToken) {
    return fetch('http://localhost'+'{(process.env.host || "localhost")'+':8000/apis/menuproperty', {
        method: 'GET',
        headers: {
            'Authorization':accessToken,
            'Content-Type': 'application/json'
        },

    })
        // .then(data => data.json())
        .then(data => data.json())

}
