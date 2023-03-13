const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { API_KEY } = process.env;

const getVideogamesDb = async () => {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
    include: {
      model: Platform,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  if (gamesDb.length === 0) {
    throw new Error('No se encontraron juegos');
  }
  return gamesDb;
};

const getVideogamesApi = async () => {
  const gamesApi = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );

  let allGamesApi = [];
  for (let i = 0; i < 11; i++) {
    allGamesApi = [...allGamesApi, ...gamesApi.data.results];
    gamesApi = await axios.get(gamesApi.data.results);
  }

  const gamesInfoReq = allGamesApi.map((v) => {
    return {
      id: v.id,
      name: v.name,
      description: v.description,
      released: v.released,
      image: v.background_image,
      rating: v.rating,
      genres: v.genres.map((g) => g.name),
      platforms: v.platforms.map((p) => p.platform.name),
    };
  });
  return gamesInfoReq;
};

const getAllVideogames = async () => {
  const apiGames = await getVideogamesApi();
  const dbGames = await getVideogamesDb();
  const allGames = [...apiGames, ...dbGames];
  return allGames;
};

module.exports = { getAllVideogames };
