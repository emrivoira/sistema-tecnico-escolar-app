const Equipo = require('../models/Equipo');

exports.crearEquipo = async (req, res) => {
  try {
    const nuevoEquipo = new Equipo(req.body);
    await nuevoEquipo.save();
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json({ message: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
