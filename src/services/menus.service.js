

module.exports = async function (accessToken, property) {
    return fetch('http://'+(process.env.host || "localhost")+':8000/apis/menus', {
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
