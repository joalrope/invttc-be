const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');
//const { permits } = require('./middlewares/permits');

const app = express(); // Crear el servidor de Express

dbConnection(); // Base de Datos
app.use(cors()); //CORS ==> comunicacion cruzada entre servidores
app.use(express.static('public')); // Directorio publico (Archivos estaticos)
app.use(express.json()); // Lectura y parseo del body

//app.use(permits());

app.use('/api/auth', require('./routes/auth')); // Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/transaction', require('./routes/transaction'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});
