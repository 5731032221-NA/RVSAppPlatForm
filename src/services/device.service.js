module.exports = {
  updatecomputerprinter: async function (accessToken, id, req) {
    return fetch(`http://localhost:8082/computerprinterbyid/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    }).then(async (res) => res.json());
  },
  updatehardware: async function (accessToken, id, req) {
    return fetch(`http://localhost:8082/registerdhardwarebyid/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    }).then(async (res) => res.json());
  },
  deletecomputerprinter: async function (accessToken, id) {
    return fetch(`http://localhost:8082/computerprinterbyid/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      }
    }).then(async (res) => res.json());
  },
  deletehardware: async function (accessToken, id) {
    return fetch(`http://localhost:8082/registerdhardwarebyid/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      }
    }).then(async (res) => res.json());
  },
  insertcomputerprinter: async function (accessToken, req) {
    return fetch(`http://localhost:8082/computerprinter`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
    inserthardware: async function (accessToken, req) {
        return fetch(`http://localhost:8082/registerdhardware`, {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }).then(async (res) => res.json());
      },
    listcomputerprinter: async function (accessToken, req) {
      return fetch("http://localhost:8082/listcomputerprinter", {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then(async (res) => res.json());
    },
    listregisterdhardware: async function (accessToken, req) {
      return fetch("http://localhost:8082/listregisterdhardware", {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then(async (res) => res.json());
    }
  };
  