require('dotenv').config();
const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Videogame, Genre, Platform } = require('../../db');
const { dataGameClean } = require('./getVgApi');

//! Busca x id los juegos de la api
export const apiVideogames = async (id) => {
  const videogame = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
  return dataGameClean(videogame.data);
};

//! Busca x id los juegos en la base de datos
export const dbVideogames = async (id) => {
  const videogame = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!videogame) throw Error('No se encontró el juego');
  return videogame;
};
