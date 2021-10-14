const router = require('express').Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getTrademarks,
  getTrademarksTitle,
  getTrademarkFactorByCode,
  createTrademark,
  updateTrademark,
  deleteTrademark,
} = require('../controllers/trademarks');
const { allowAccessTo } = require('../middlewares/allow-access-to');
const { createReg, updateReg, deleteReg } = require('../helper/roles');

/*
    Rutas de Marcas (trademark routes)
    host + api/trademarks
*/

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);

//Obtener Marcas
router.get('/', getTrademarks);

//Obtener solo el titulo de las marcas
router.get('/title', getTrademarksTitle);

//Obtener factor de una marca dado el código
router.get('/factor/:code', getTrademarkFactorByCode);

//Crear una nueva Marca
router.post(
  '/',
  [
    allowAccessTo(createReg),
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('title').exists().withMessage('El Titulo es Obligatorio'),
    check('factor')
      .exists()
      .withMessage(
        'El factor de multiplicacion es necasario para calcular el Precio de Venta'
      ),
    fieldsValidator,
  ],
  createTrademark
);

//Obtener un Marca mediante Id
// router.get('/:id', getTrademarkById);

// Actualizar informacion de una Marca
router.put('/:id', allowAccessTo(updateReg), updateTrademark);

//Eliminar una Marca
router.delete('/:id', allowAccessTo(deleteReg), deleteTrademark);

module.exports = router;
