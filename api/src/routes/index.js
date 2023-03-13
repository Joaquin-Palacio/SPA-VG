const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genresRoute = require('../controllers/genreController');
const platformsRoute = require('../controllers/platformController');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', genresRoute);
router.use('/platforms', platformsRoute);

module.exports = router;