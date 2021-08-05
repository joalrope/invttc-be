const router = require('express').Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
  getSaleById,
  getSaleByCode,
} = require('../controllers/sales');
const { allowAccessTo } = require('../middlewares/allow-access-to');
const { createReg, updateReg, deleteReg } = require('../helper/roles');
/*
    Rutas de Ventas (Sales routes)
    host + api/Sales
*/

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);

//Obtener todas las Ventas
router.get('/', getSales);

//Crear una nueva Venta
router.post(
  '/',
  [
    allowAccessTo(createReg),
    check('invoiceId')
      .exists()
      .withMessage('El Codigo de factura es Obligatorio'),
    check('date').exists().withMessage('La Fecha es Obligatoria'),
    check('customer')
      .exists()
      .withMessage('Los Datos del comprador son Obligatorios'),
    fieldsValidator,
  ],
  createSale
);

//Obtener una Venta mediante Id
router.get('/:id', getSaleById);

//Actualizar informacion de una Venta
router.put('/:id', allowAccessTo(updateReg), updateSale);

//Eliminar una Venta
router.delete('/:id', allowAccessTo(deleteReg), deleteSale);

//Obtener una Venta mediante Code
router.get('/code/:code', getSaleByCode);

module.exports = router;
