

module.exports = async function (accessToken, property) {
    return fetch('http://localhost:8082/menus', {
        method: 'POST',
        headers: {
            'Authorization': accessToken,
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            property: property
        })
    })
        .then(data => data.json())


}
