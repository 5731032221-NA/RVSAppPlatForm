module.exports = {
  listRoom: async function (accessToken) {
    return (
      fetch("http://localhost:8000/apis/room-masters", {
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
    return fetch("http://localhost:8000/apis/room-masters", {
      method: "POST",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  getRoombyid: async function (accessToken, id) {
    return fetch(`http://localhost:8000/apis/room-masters/${id}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },

  getRoombykey: async function (accessToken, keySearch) {
    return fetch(`http://localhost:8000/apis/room-masters-keySearch/${keySearch}`, {
      method: "GET",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
  updateRoom: async function (accessToken, id, req) {
    return fetch(`http://localhost:8000/apis/room-masters/${id}`, {
      method: "PUT",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => res.json());
  },
  deletebyroomnum: async function (accessToken, roomnum) {
    return fetch(`http://localhost:8000/apis/room-masters/${roomnum}`, {
      method: "DELETE",
      headers: {
        Authorization:  accessToken,
        "Content-Type": "application/json",
      },
    }).then(async (res) => res.json());
  },
};
