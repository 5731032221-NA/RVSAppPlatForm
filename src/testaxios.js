const axios = require("axios").default;

axios
  .get("http://"+(process.env.host || "localhost")+":80/users")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
