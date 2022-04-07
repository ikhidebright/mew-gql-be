const http = require("../service/axios");

module.exports = {
  getCurrentWeatherByCityName: async ({ cityName }) => {
    try {
      const { data } = await http.get("weather", {
        params: { q: cityName },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
