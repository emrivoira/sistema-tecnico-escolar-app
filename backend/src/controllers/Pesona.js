const Persona = require('../models/Persona');

exports.obtenerPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerPersona = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).json({ message: 'Persona no encontrada' });
    res.json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.buscarPersonas = async (req, res) => {
  try {
    const { nombre, apellido, dni } = req.query;
    let query = {};
    if (nombre) query.nombre = new RegExp(nombre, 'i');
    if (apellido) query.apellido = new RegExp(apellido, 'i');
    if (dni) query.dni = dni;

    const personas = await Persona.find(query);
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
