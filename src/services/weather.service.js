module.exports = {
  getweather: async function (accessToken, propertycode) {
    return fetch(
      "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={b5c09888c9bc6736845f9a1c2ca172d5}",
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => res.json());
  },
};
