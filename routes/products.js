const router = require('express').Router();
const {check} = require('express-validator');
const {fieldsValidator} = require('../middlewares/fields-validator');
const {jwtValidator} = require('../middlewares/jwt-validator');
const { getProducts,
        getProductByCode,
        getProductById,
        createProduct,
        updateProduct,
        updateQtyProduct,
        deleteProduct 
        } = require('../controllers/products');
const {allowAccessTo} = require('../middlewares/allow-access-to');
const {rtcreateprod} = require('../helper/roles');
/*
    Rutas de Eventos (events routes)
    host + api/events
*/ 

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);


//Obtener eventos
router.get('/', getProducts);


//Crear un nuevo producto
router.post(
    '/',
    [
        allowAccessTo(rtcreateprod),
        check('code').exists().withMessage('El Codigo es Obligatorio'),
        check('title').exists().withMessage('El Titulo es Obligatorio'),
        fieldsValidator
    ],
    createProduct
);


//Actualizar informacion de un Repuesto
router.put('/:id', allowAccessTo('admin', 'owner') ,updateProduct);
router.put('/qty/:id', updateQtyProduct);

//Eliminar un evento
router.delete('/:id', deleteProduct);

//Obtener un evento mediante Id
router.get('/:id', getProductById);

//Obtener un evento mediante Code
router.get('/code/:code', getProductByCode);

module.exports = router;