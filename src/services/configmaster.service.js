module.exports = {
  insertconfigmaster: async function (accessToken, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/insertconfigmastercopm`, {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');sessionStorage.removeItem("property");sessionStorage.removeItem("curent_component");window.location.reload(false);}else return res.json();});
  },

  listconfigmaster: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/listconfigmastercomp", {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');sessionStorage.removeItem("property");sessionStorage.removeItem("curent_component");window.location.reload(false);}else return res.json();});
  },

  updateconfigmaster: async function (accessToken, id, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/updateconfigmasterbyidcomp/${id}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');sessionStorage.removeItem("property");sessionStorage.removeItem("curent_component");window.location.reload(false);}else return res.json();});
  },

  deleteconfigmaster: async function (accessToken, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/configmasterbyidcomp/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');sessionStorage.removeItem("property");sessionStorage.removeItem("curent_component");window.location.reload(false);}else return res.json();});
  },
};
