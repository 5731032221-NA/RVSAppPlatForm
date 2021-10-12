module.exports = {
  insertconfigmaster: async function (accessToken, req) {
    return fetch(`http://localhost:8082/insertconfigmastercopm`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  listconfigmaster: async function (accessToken, req) {
    return fetch("http://localhost:8082/listconfigmastercomp", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  updateconfigmaster: async function (accessToken, id, req) {
    return fetch(`http://localhost:8082/updateconfigmasterbyidcomp/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  deleteconfigmaster: async function (accessToken, id) {
    return fetch(`http://localhost:8082/configmasterbyidcomp/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
};
