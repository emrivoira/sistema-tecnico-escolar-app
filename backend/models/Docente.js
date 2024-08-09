const mongoose = require('mongoose');
const personaSchema = require('./persona');

const Persona = mongoose.model('Persona', personaSchema);

const areaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  esCoordinador: {
    type: Boolean,
    default: false
  }
});

const docenteSchema = new mongoose.Schema({
  areas: [areaSchema],
  esReferenteTIC: {
    type: Boolean,
    default: false
  }
});

docenteSchema.virtual('areasCoordinadas').get(function() {
  return this.areas.filter(area => area.esCoordinador).map(area => area.nombre);
});

const Docente = Persona.discriminator('Docente', docenteSchema);

module.exports = Docente;
