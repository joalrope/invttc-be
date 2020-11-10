const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');



// Crear el servidor de Express
const app = express();


// Base de Datos
dbConnection();


//CORS ==> comunicacion cruzada entre servidores
app.use(cors());



// Middlewares (Funciones que se ejecutaran cada vez que se realicen peticiones)
// Directorio publico (Archivos estaticos)
app.use(express.static('public'));



// Lectura y parseo del body
app.use(express.json());



// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/spareparts', require('./routes/products'));



// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});