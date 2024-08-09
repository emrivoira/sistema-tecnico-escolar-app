const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

router.get('/', personaController.obtenerPersonas);
router.get('/buscar', personaController.buscarPersonas);
router.get('/:id', personaController.obtenerPersona);

module.exports = router;
