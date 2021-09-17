const router = require('express').Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getProducts,
  getProductsByCodeRegex,
  getProductByCode,
  getProductById,
  createProduct,
  updateProduct,
  updateQtyProduct,
  deleteProduct,
} = require('../controllers/products');
const { allowAccessTo } = require('../middlewares/allow-access-to');
const { createReg, updateReg, deleteReg } = require('../helper/roles');
/*
    Rutas de Productos (products routes)
    host + api/products
*/

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);

//Obtener eventos
router.get('/', getProducts);

//Crear un nuevo producto
router.post(
  '/',
  [
    allowAccessTo(createReg),
    check('code').exists().withMessage('El Codigo es Obligatorio'),
    check('title').exists().withMessage('El Titulo es Obligatorio'),
    fieldsValidator,
  ],
  createProduct
);

//Obtener un Producto mediante Id
router.get('/:id', getProductById);

//Actualizar informacion de un Producto
router.put('/:id', allowAccessTo(updateReg), updateProduct);

//Eliminar un Producto
router.delete('/:id', allowAccessTo(deleteReg), deleteProduct);

//Obtener los productos cuyo código coincida con la expresion regular
router.get('/regex/:code', getProductsByCodeRegex);

//Obtener un Productos cuya expresion regular coincida con Code
router.get('/code/:code', getProductByCode);

// Actualizar la cantidad de un Producto mediante Id
router.put('/qty/:id', updateQtyProduct);

module.exports = router;
