const Ticket = require('../models/Ticket');

exports.crearTicket = async (req, res) => {
  try {
    const nuevoTicket = new Ticket(req.body);
    await nuevoTicket.save();
    res.status(201).json(nuevoTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
    res.json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.agregarEstadoTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
    
    await ticket.agregarEstado(req.body.estado, req.body.observacion, req.body.actualizadorId);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
