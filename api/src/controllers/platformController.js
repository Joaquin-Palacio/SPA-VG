const express = require('express');
const router = express.Router();
const { Platform } = require('../db');
const axios = require('axios');
const { URL, API_KEY } = process.env;

router.get('/', async (req, res, next) => {
  let apiPlatforms = await axios.get(`${URL}/platforms?key=${API_KEY}`);
  try {
    //* platforms de la api
    apiPlatforms = apiPlatforms.data.results;

    //* Agrega a la base de datos si no existe
    apiPlatforms.forEach(
      async (p) => await Platform.findOrCreate({ where: { name: p.name } })
    );
    let platformsDb = await Platform.findAll();
    res.status(200).send(platformsDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
