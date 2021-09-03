module.exports = {
  listRoom: async function (accessToken) {
    return (
      fetch("http://localhost:8082/room-masters", {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
        // .then(data => data.json())
        .then((data) => data.json())
    );
  },
  postRoom: async function (accessToken, req) {
    return fetch("http://localhost:8082/room-masters", {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getRoombyid: async function (accessToken, id) {
    return fetch(`http://localhost:8082/room-masters/${id}`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  updateRoom: async function (accessToken, req, id) {
    return fetch(`http://localhost:8082/room-masters/${id}`, {
      method: "PUT",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  //   deleteRoombyid: async function (accessToken, id) {
  //     return fetch(`http://localhost:8082/room-masters/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: accessToken,
  //         "Content-Type": "application/json",
  //       },
  //     }).then(async (res) => res.json());
  //   },
};
