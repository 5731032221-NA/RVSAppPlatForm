

module.exports = async function (accessToken,id) {
        return fetch(`http://localhost:8000/apis/propertypermission/${id}`, {
          method: "GET",
          headers: {
            "Origin": "http://localhost:3000",
            Authorization:  accessToken,
            "Content-Type": "application/json",
          },
        }).then(async (res) => res.json());
      
}
