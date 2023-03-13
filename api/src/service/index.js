const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { URL, API_KEY } = process.env;

const getVideogamesApi = async () => {
  const callApi = await axios.get(`${URL}/games?key=${API_KEY}`);
  console.log(callApi);
}