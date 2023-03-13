const express = require('express');
const router = express.Router();
const { Genre } = require('../db');
const axios = require('axios');
const { URL, API_KEY } = process.env;

router.get('/', async (req, res, next) => {
  let apiGenres = await axios.get(`${URL}/genres?key=${API_KEY}`);
  try {
    //* generos de la api
    apiGenres = apiGenres.data.results;

    //* Agrega a la base de datos si no existe
    apiGenres.forEach(
      async (g) => await Genre.findOrCreate({ where: { name: g.name } })
    );
    let genresDb = await Genre.findAll();
    res.status(200).send(genresDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
