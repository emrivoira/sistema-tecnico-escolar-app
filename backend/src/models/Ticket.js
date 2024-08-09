const mongoose = require('mongoose');

const estadoTicketSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ['Abierto', 'En Progreso', 'En Espera', 'Resuelto', 'Cerrado'],
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  observacion: String,
  actualizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  }
});

const ticketSchema = new mongoose.Schema({
  numeroTicket: {
    type: String,
    required: true,
    unique: true
  },
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  reportadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  referenteTIC: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Docente',
    required: true
  },
  problema: {
    type: String,
    required: true
  },
  descripcion: String,
  esGarantia: {
    type: Boolean,
    default: false
  },
  numeroTicketExterno: String,
  prioridad: {
    type: String,
    enum: ['Baja', 'Media', 'Alta', 'Urgente'],
    default: 'Media'
  },
  fechaResolucion: Date,
  historialEstados: [estadoTicketSchema],
  notas: [{ 
    texto: String, 
    creadoPor: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Persona'
    },
    fechaCreacion: { type: Date, default: Date.now }
  }],
  archivosAdjuntos: [{
    nombre: String,
    url: String,
    tipo: String
  }]
}, { timestamps: true });

ticketSchema.pre('save', function(next) {
  if (this.isNew) {
    this.historialEstados.push({
      estado: 'Abierto',
      actualizadoPor: this.reportadoPor,
      observacion: 'Ticket creado'
    });
  }
  next();
});

ticketSchema.methods.agregarEstado = function(estado, observacion, actualizadorId) {
  this.historialEstados.push({
    estado,
    observacion,
    actualizadoPor: actualizadorId
  });
  
  if (estado === 'Resuelto' || estado === 'Cerrado') {
    this.fechaResolucion = new Date();
  }
  
  return this.save();
};

module.exports = mongoose.model('Ticket', ticketSchema);
