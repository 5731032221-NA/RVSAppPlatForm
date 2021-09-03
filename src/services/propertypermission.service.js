

module.exports = async function (accessToken,id) {
        return fetch(`http://localhost:8082/propertypermission/${id}`, {
          method: "GET",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }).then(async (res) => res.json());
      
}
