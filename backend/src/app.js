const express = require('express');
const mongoose = require('mongoose');
const equipoRoutes = require('./routes/equipoRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const personaRoutes = require('./routes/personaRoutes');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use('/api/equipos', equipoRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/personas', personaRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

module.exports = app;
