const Estudiante = require('../models/Estudiante');

exports.crearEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    await nuevoEstudiante.save();
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
