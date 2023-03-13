const axios = require('axios');
const { Platform } = require('../db');
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
  const infoApi = await axios.get(
    `https://api.rawg.io/api/platforms?key=${API_KEY}`
  );
  try {
    const allPlatforms = infoApi.data.results;
    allPlatforms.forEach((p) => {
      Platform.findOrCreate({
        where: { name: p.name, id: p.id },
      });
    });

    const dbPlatforms = await Platform.findAll();
    res.status(200).send(dbPlatforms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;