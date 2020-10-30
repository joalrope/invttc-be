const router = require('express').Router();
const {check} = require('express-validator');
const {fieldsValidator} = require('../middlewares/fields-validator');
const {jwtValidator} = require('../middlewares/jwt-validator');
const {getSpareParts, getSparePartByCode, getSparePartById, createSparePart, updateSparePart, deleteSparePart} = require('../controllers/spareparts');
const {isDate} = require('../helper/isDate');

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
        check('title').exists().withMessage('El Titulo es Obligatorio'),
        check('start').exists().withMessage('La fecha de Inicio es obligatoria')
            .custom(isDate).withMessage('La fecha de Inicio no es una fecha válida'),

        check('end').exists().withMessage('La fecha de finalización es obligatoria')
            .custom(isDate).withMessage('La fecha de finalización no es una fecha válida'),

        fieldsValidator
    ],
    createSparePart
);


//Actualizar informacion de un evento
router.put('/:id', updateSparePart);


//Eliminar un evento
router.delete('/:id', deleteSparePart);

//Obtener un evento mediante Id
router.get('/:id', getSparePartById);

//Obtener un evento mediante Code
router.get('/code/:code', getSparePartByCode);

module.exports = router;

