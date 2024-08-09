const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

router.post('/', docenteController.crearDocente);
router.get('/', docenteController.obtenerDocentes);
router.get('/:id', docenteController.obtenerDocente);
router.put('/:id', docenteController.actualizarDocente);
router.delete('/:id', docenteController.eliminarDocente);

module.exports = router;
