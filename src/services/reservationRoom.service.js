module.exports = {
  getreservationroom: async function (accessToken) {
    return (
      fetch("http://"+(process.env.host || "localhost")+":8000/apis/reservation-room", {
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
  postreservationroom: async function (accessToken, req) {
    return fetch("http://"+(process.env.host || "localhost")+":8000/apis/reservation-room", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getreservationroombyid: async function (accessToken, roomno) {
    return fetch(`http://${(process.env.host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  // getRoombykey: async function (accessToken, keySearch) {
  //   return fetch(`http://${(process.env.host || "localhost")}:8000/apis/room-masters-keySearch/${keySearch}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization:  accessToken,
  //       "Content-Type": "application/json",
  //     },
  //   }).then(async (res) => res.json());
  // },
  updatereservationroom: async function (accessToken, roomno, req) {
    return fetch(`http://${(process.env.host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  
  deletereservationroom: async function (accessToken, roomno) {
    return fetch(`http://${(process.env.host || "localhost")}:8000/apis/reservation-room/${roomno}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
};
