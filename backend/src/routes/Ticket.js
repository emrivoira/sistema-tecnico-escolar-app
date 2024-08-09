const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.crearTicket);
router.get('/', ticketController.obtenerTickets);
router.get('/:id', ticketController.obtenerTicket);
router.put('/:id', ticketController.actualizarTicket);
router.delete('/:id', ticketController.eliminarTicket);
router.post('/:id/estado', ticketController.agregarEstadoTicket);

module.exports = router;
