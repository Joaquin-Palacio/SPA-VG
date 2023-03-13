const { Genre } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

export const getGenres = async () => {
  //* generos de la api
  let apiGenres = await axios.get(`${URL}/genres?key=${API_KEY}`);
  apiGenres = apiGenres.data.results;

  //* Agrega a la base de datos si no existe
  apiGenres.forEach(
    async (g) => await Genre.findOrCreate({ where: { name: g.name } })
  );
  return await Genre.findAll();
};
