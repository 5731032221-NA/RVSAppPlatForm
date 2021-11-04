module.exports = {
  updatecomputerprinter: async function (accessToken, id, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/computerprinterbyid/${id}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  updatehardware: async function (accessToken, id, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/registerdhardwarebyid/${id}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  deletecomputerprinter: async function (accessToken, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/computerprinterbyid/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      }
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  deletehardware: async function (accessToken, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/registerdhardwarebyid/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      }
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  insertcomputerprinter: async function (accessToken, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/computerprinter`, {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
    inserthardware: async function (accessToken, req) {
        return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/registerdhardware`, {
          method: "POST",
          headers: {
            Authorization:  accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
      },
    listcomputerprinter: async function (accessToken, req) {
      return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listcomputerprinter", {
        method: "GET",
        headers: {
          Authorization:  accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
    },
    listregisterdhardware: async function (accessToken, req) {
      return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listregisterdhardware", {
        method: "GET",
        headers: {
          Authorization:  accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
    }
  };
  