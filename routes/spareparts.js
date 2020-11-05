const router = require('express').Router();
const {check} = require('express-validator');
const {fieldsValidator} = require('../middlewares/fields-validator');
const {jwtValidator} = require('../middlewares/jwt-validator');
const { getSpareParts,
        getSparePartByCode,
        getSparePartById,
        createSparePart,
        updateSparePart,
        updateQtySparePart,
        deleteSparePart } = require('../controllers/spareparts');

/*
    Rutas de Eventos (events routes)
    host + api/events
*/ 

//Todas las rutas deben pasar por la Validacion del Token
router.use(jwtValidator);


//Obtener eventos
router.get('/', getSpareParts);


//Crear un nuevo evento
router.post(
    '/',
    [
        check('code').exists().withMessage('El Codigo es Obligatorio'),
        check('title').exists().withMessage('El Titulo es Obligatorio'),
        fieldsValidator
    ],
    createSparePart
);


//Actualizar informacion de un Repuesto
router.put('/:id', updateSparePart);
router.put('/qty/:id', updateQtySparePart);

//Eliminar un evento
router.delete('/:id', deleteSparePart);

//Obtener un evento mediante Id
router.get('/:id', getSparePartById);

//Obtener un evento mediante Code
router.get('/code/:code', getSparePartByCode);

module.exports = router;