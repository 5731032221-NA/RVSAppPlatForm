module.exports = {
  getusercomponentpermision: async function (accessToken,username,component) {
    return fetch(`http://localhost:8082/usercomponentpermision/${username}/${component}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getusernamebyproperty: async function (accessToken,propertycode) {
    return fetch(`http://localhost:8082/usernamebyproperty/${propertycode}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getconfigurationbypropertycode: async function (accessToken,propertycode) {
    return fetch(`http://localhost:8082/configurationbypropertycode/${propertycode}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  updateconfiguration: async function (accessToken,req) {
    return fetch(`http://localhost:8082/configuration`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getuserpermission: async function (accessToken,username) {
    return fetch(`http://localhost:8082/userpermissionbyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getposition: async function (accessToken) {
    return fetch(`http://localhost:8082/position`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  postposition: async function (accessToken, req) {
    return fetch(`http://localhost:8082/position`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  userpropertybyusername: async function (accessToken,username) {
    return fetch(`http://localhost:8082/userpropertybyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  userrolebyusername: async function (accessToken,username) {
    return fetch(`http://localhost:8082/userrolebyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  rolepermissionbyrole: async function (accessToken, req) {
    return fetch("http://localhost:8082/rolepermissionbyrole", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
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
  updateuser: async function (accessToken, req) {
    return fetch("http://localhost:8082/user", {
      method: "PUT",
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
  updaterole: async function (accessToken, req) {
    return fetch("http://localhost:8082/rolegroup", {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  deleteuserbyusername: async function (accessToken, username) {
    return fetch(`http://localhost:8082/user/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  deleterolebycode: async function (accessToken, code) {
    return fetch(`http://localhost:8082/rolegroup/${code}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
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

  // updateuser: async function (accessToken, req, id) {
  //   return fetch(`http://localhost:8082/listuser/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: accessToken,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(req),
  //   }).then(async (res) => res.json());
  // },

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
