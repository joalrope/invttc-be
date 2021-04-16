const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');


// Crear el servidor de Express
const app = express();


// Base de Datos
dbConnection();


// Middlewares (Funciones que se ejecutaran cada vez que se realicen peticiones)
//CORS ==> comunicacion cruzada entre servidores
app.use(cors());


// Directorio publico (Archivos estaticos)
app.use(express.static('public'));


// Lectura y parseo del body
app.use(express.json());


app.post('*', async (req, res, next) => {
    const role = req.header('x-role');
    console.log(role)
    if (!role === 'basic') {
        console.log('POST happen', role)
        next();
    }
    next()
})


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/sales', require('./routes/sales'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});