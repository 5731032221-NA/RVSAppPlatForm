module.exports = {
  getreservationroom: async function (accessToken) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/reservation-room", {
        method: "GET",
        headers: {
          Authorization:  accessToken,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
   },
  postreservationroom: async function (accessToken, req) {
    return fetch("http://"+(process.env.REACT_APP_host || "localhost")+":8000/apis/reservation-room", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  getreservationroombyid: async function (accessToken, roomno) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },

  // getRoombykey: async function (accessToken, keySearch) {
  //   return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/room-masters-keySearch/${keySearch}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization:  accessToken,
  //       "Content-Type": "application/json",
  //     },
  //   }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  // },
  updatereservationroom: async function (accessToken, roomno, req) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
  
  deletereservationroom: async function (accessToken, roomno) {
    return fetch(`http://${(process.env.REACT_APP_host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {if(res.status==401){sessionStorage.removeItem('token');window.location.reload(false);}else return res.json();});
  },
};
