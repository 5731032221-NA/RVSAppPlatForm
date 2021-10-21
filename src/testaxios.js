const axios = require("axios").default;

axios
  .get("http://"+(process.env.REACT_APP_host || "localhost")+":80/users")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
