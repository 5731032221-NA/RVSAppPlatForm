

module.exports = async function (accessToken,id,username) {
        return fetch(`http://${(process.env.host || "localhost")}:8000/apis/propertypermission/${id}/${username}`, {
          method: "GET",
          headers: {
            "Origin": "http://"+(process.env.host || "localhost")+":3000",
            Authorization:  accessToken,
            "Content-Type": "application/json",
          },
        }).then(async (res) => res.json());
      
}
