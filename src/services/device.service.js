module.exports = {
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
  