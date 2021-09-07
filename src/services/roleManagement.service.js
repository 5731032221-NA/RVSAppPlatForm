module.exports = {
  listallproperty: async function (accessToken) {
    return fetch("http://localhost:8082/listallproperty", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  listrole: async function (accessToken, req) {
    return fetch("http://localhost:8082/listrole", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  postrole: async function (accessToken, req) {
    return fetch("http://localhost:8082/listrole", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getrolebyid: async function (accessToken, id) {
    return fetch(`http://localhost:8082/listrole/${id}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  updaterole: async function (accessToken, req, id) {
    return fetch(`http://localhost:8082/listrole/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  deleterolebyid: async function (accessToken, id) {
    return fetch(`http://localhost:8082/listrole/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
};
