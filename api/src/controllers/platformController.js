const { Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

export const getGenres = async () => {
  //* platforms de la api
  let apiPlatforms = await axios.get(`${URL}/platforms?key=${API_KEY}`);
  apiPlatforms = apiPlatforms.data.results;

  //* Agrega a la base de datos si no existe
  apiPlatforms.forEach(
    async (p) => await Platform.findOrCreate({ where: { name: p.name } })
  );
  return await Platform.findAll();
};
