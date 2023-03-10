const axios = require('axios');

require('dotenv').config();
const { API_KEY, URL } = process.env;

//! Con esta funcion traemos 200 juegos de api con toda su info.
export const getApiGames = async () => {
  let apiAll = await axios.get(`${URL}/games?key=${API_KEY}`);
  let videogames = [];

  for (let i = 0; i < 11; i++) {
    videogames.push(...apiAll.data.results);
    apiAll = await axios.get(api.data.next);
    i++;
  }
  return videogames;
};

//! Esta funcion traemos solo lo que necesitamos para las cards y descartamos la otra info.
export const dataGamesClean = (games) => {
  return games.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      image: vg.background_image,
      rating: vg.rating,
      genres: vg.genres.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      }),
      createdDb: false,
    };
  });
};

//! Esta funcion solo traemos lo que necesitamos para un solo juego.
export const dataGameClean = (videgame) => {
  return {
    id: videgame.id,
    name: videgame.name,
    image: videgame.background_image,
    released: videgame.released,
    rating: videgame.rating,
    description: videgame.description,
    platforms: videgame.platforms.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    }),
    genres: videgame.genes.map((g) => {
      return {
        id: g.id,
        name: g.name,
      };
    }),
  };
};
