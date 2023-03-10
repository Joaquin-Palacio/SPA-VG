require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre /* Platform */ } = require('../db');
const { Op } = require('sequelize');
const { dataGamesClean, getApiGames } = require('./getVgApi');
const { URL, API_KEY } = process.env;

//! Trae todos los juegos de db y api
export const getAllGames = async () => {
  //? Trae todos los juegos de base de datos.
  const dbGames = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const onlyApiGames = await getApiGames();
  const apiGames = await dataGamesClean(onlyApiGames);

  const allGames = dbGames.concat(apiGames);

  if (!allGames.length) throw Error('No se encontraron los videojuegos');
  return allGames;
};

//! Trae los videojuegos de db y api por su nombre.
export const getVideogamesByName = async (name) => {
  //? Trae los juegos de base de datos.
  const dbGames = await Videogame.findAll({
    where: {
      name: { [Op.ilike]: `%${name}%` },
    },
  });

  //? Trae los juegos de api.
  const apiGames = await axios.get(
    `${URL}/games?key=${API_KEY}&search=${name}`
  );

  //? Traemos la data que necesitamos.
  const videogames = await dataGamesClean(apiGames.data.results);

  //? Traemos los primeros 15 resultados.
  const allGames = [...videogames, ...dbGames].slice(0, 15);

  //? Si no hay match, devuelve msj de error y vuelve a cargar todos los juegos.
  if (!allGames.length) throw Error('No hay resultados');
  return allGames;
};
