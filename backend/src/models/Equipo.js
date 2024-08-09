const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  numeroSerie: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  hardwareID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  numeroServidor: {
    type: Number,
    required: true,
    min: 1
  },
  tipo: {
    type: String,
    enum: ['Netbook', 'PC', 'Tablet', 'Otro'],
    required: true
  },
  marca: String,
  modelo: String,
  estado: {
    type: String,
    enum: ['Asignado', 'Disponible', 'En reparación', 'Baja'],
    default: 'Disponible'
  },
  asignadoA: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'tipoAsignacion'
  },
  tipoAsignacion: {
    type: String,
    enum: ['Estudiante', 'Docente'],
    default: null
  },
  fechaAsignacion: Date,
  fechaAdquisicion: Date,
  ultimoMantenimiento: Date
}, { timestamps: true });

equipoSchema.index({ numeroSerie: 1, hardwareID: 1 });

module.exports = mongoose.model('Equipo', equipoSchema);
