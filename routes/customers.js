const router = require('express').Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getCustomers,
  getCustomerByCode,
  getCustomersByCodeRegex,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');
const { allowAccessTo } = require('../middlewares/allow-access-to');
const { createReg, updateReg, deleteReg } = require('../helper/roles');
/*
    Rutas de Clientes (customers routes)
    host + api/customers
*/

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);

//Obtener clientes
router.get('/', getCustomers);

//Crear un nuevo cliente
router.post(
  '/',
  [
    allowAccessTo(createReg),
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('name').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createCustomer
);

//Obtener un Cliente mediante Id
router.get('/:id', getCustomerById);

//Actualizar informacion de un Cliente
router.put('/:id', allowAccessTo(updateReg), updateCustomer);

//Eliminar un Cliente
router.delete('/:id', allowAccessTo(deleteReg), deleteCustomer);

//Obtener un Cliente mediante RIF (code) ó Nombre
router.get('/code/:code', getCustomerByCode);

//Obtener los clientes cuyo código coincida con la expresion regular
router.get('/regex/:code', getCustomersByCodeRegex);

module.exports = router;
