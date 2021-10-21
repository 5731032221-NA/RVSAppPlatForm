module.exports = {
  listRoom: async function (accessToken) {
    return (
      fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/room-masters", {
        method: "GET",
        headers: {
          Authorization:  accessToken,
          "Content-Type": "application/json",
        },
      })
        // .then(data => data.json())
        .then((data) => data.json())
    );
  },
  postRoom: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/room-masters", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.setItem("token", false);window.location.reload(false);}else return res.json();});
  },
  getRoombyid: async function (accessToken, id) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/room-masters/${id}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.setItem("token", false);window.location.reload(false);}else return res.json();});
  },

  getRoombykey: async function (accessToken, keySearch) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/room-masters-keySearch/${keySearch}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.setItem("token", false);window.location.reload(false);}else return res.json();});
  },
  updateRoom: async function (accessToken, id, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/room-masters/${id}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.setItem("token", false);window.location.reload(false);}else return res.json();});
  },
  deletebyroomnum: async function (accessToken, roomnum) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/room-masters/${roomnum}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.setItem("token", false);window.location.reload(false);}else return res.json();});
  },
};
