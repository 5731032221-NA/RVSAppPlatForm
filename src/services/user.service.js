module.exports = {
  listuser: async function (accessToken, req) {
    return fetch("http://localhost:8082/listuser", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listpropertybyroles: async function (accessToken, req) {
    return fetch("http://localhost:8082/listpropertybyroles", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listallproperty: async function (accessToken) {
    return fetch("http://localhost:8082/listallproperty", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  postuser: async function (accessToken, req) {
    return fetch("http://localhost:8082/user", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  postrole: async function (accessToken, req) {
    return fetch("http://localhost:8082/rolegroup", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },


  getuser: async function (accessToken) {
    return fetch("http://localhost:8082/user-management/users", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  },

  getuserbyid: async function (accessToken, id) {
    return fetch(`http://localhost:8082/listuser/${id}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  updateuser: async function (accessToken, req, id) {
    return fetch(`http://localhost:8082/listuser/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  deleteuserbyid: async function (accessToken, req, id) {
    return fetch(`http://localhost:8082/listuser/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
};
