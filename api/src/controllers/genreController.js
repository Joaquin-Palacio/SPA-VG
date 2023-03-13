const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
  const infoApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  try {
    const allGenres = infoApi.data.results;
    allGenres.forEach((g) => {
      Genre.findOrCreate({
        where: { name: g.name, id: g.id },
      });
    });

    const dbGenres = await Genre.findAll();
    res.status(200).send(dbGenres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
