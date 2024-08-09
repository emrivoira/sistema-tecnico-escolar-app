const Docente = require('../models/Docente');

exports.crearDocente = async (req, res) => {
  try {
    const nuevoDocente = new Docente(req.body);
    await nuevoDocente.save();
    res.status(201).json(nuevoDocente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerDocentes = async (req, res) => {
  try {
    const docentes = await Docente.find();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerDocente = async (req, res) => {
  try {
    const docente = await Docente.findById(req.params.id);
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(docente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarDocente = async (req, res) => {
  try {
    const docente = await Docente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(docente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarDocente = async (req, res) => {
  try {
    const docente = await Docente.findByIdAndDelete(req.params.id);
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json({ message: 'Docente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
