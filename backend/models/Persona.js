const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} no es un email válido!`
    }
  },
  telefono: String,
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo',
    default: null
  }
}, { timestamps: true, discriminatorKey: 'tipo' });

module.exports = personaSchema;
