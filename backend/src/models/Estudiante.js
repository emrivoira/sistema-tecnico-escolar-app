const mongoose = require('mongoose');
const personaSchema = require('./persona');

const Persona = mongoose.model('Persona', personaSchema);

const estudianteSchema = new mongoose.Schema({
  curso: String,
  division: String,
  anioIngreso: Number
});

const Estudiante = Persona.discriminator('Estudiante', estudianteSchema);

module.exports = Estudiante;
