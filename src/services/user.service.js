module.exports = {
  getusercomponentpermision: async function (accessToken,username,component) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/usercomponentpermision/${username}/${component}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getusernamebyproperty: async function (accessToken,propertycode) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/usernamebyproperty/${propertycode}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getconfigurationbypropertycode: async function (accessToken,propertycode) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/configurationbypropertycode/${propertycode}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  updateconfiguration: async function (accessToken,req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/configuration`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getuserpermission: async function (accessToken,username) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/userpermissionbyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  getposition: async function (accessToken) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/position`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  postposition: async function (accessToken, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/position`, {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  userpropertybyusername: async function (accessToken,username) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/userpropertybyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  userrolebyusername: async function (accessToken,username) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/userrolebyusername/${username}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  rolepermissionbyrole: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/rolepermissionbyrole", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listrole: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listrole", {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listuser: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listuser", {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listpropertybyroles: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listpropertybyroles", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  listallproperty: async function (accessToken) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listallproperty", {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  postuser: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/user", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  updateuser: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/user", {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  postrole: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/rolegroup", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  updaterole: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/rolegroup", {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },

  deleteuserbyusername: async function (accessToken, username) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/user/${username}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  deleterolebycode: async function (accessToken, code) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/rolegroup/${code}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  getuser: async function (accessToken) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/user-management/users", {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  },

  getuserbyid: async function (accessToken, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/listuser/${id}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  // updateuser: async function (accessToken, req, id) {
  //   return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/listuser/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization:  accessToken,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(req),
  //   }).then(async (res) => res.json());
  // },

  deleteuserbyid: async function (accessToken, req, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/listuser/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
};
