module.exports = {
  getweather: async function () {
    return fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=bangkok&appid=b5c09888c9bc6736845f9a1c2ca172d5",
      {
        method: "GET",
      }
    ).then(async (res) => res.json());
  },
};
