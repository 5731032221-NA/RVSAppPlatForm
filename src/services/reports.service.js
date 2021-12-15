module.exports = {
  getReports: async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();

      return res.json();
    });
  },
};
