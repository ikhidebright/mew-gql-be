const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const http = axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  },
});

module.exports = http;
