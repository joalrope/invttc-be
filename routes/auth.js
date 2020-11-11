const router = require('express').Router();
const {check} = require('express-validator')
const {fieldsValidator} = require('../middlewares/fields-validator');
const {jwtValidator} = require('../middlewares/jwt-validator');
const { createUser,
        userLogin,
        revalidateToken,
        updateUser} = require('../controllers/auth');

/*
    Rutas de Usuarios / Auth
    host + api/auth
*/ 
router.post(
    '/new',
    [   //middleware
        check('name')
            .exists().withMessage('es obligatorio'),
        
        check('email')
            .isEmail().withMessage('no es válido')
            .exists().withMessage('es Obligatorio'),
            
        check('password')
            // .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
            // .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
            .isLength({min: 6}).withMessage('debe tener al menos 6 carácteres'),
        
        fieldsValidator
    ],
    createUser
    );
    
router.post(
    '/',
    [   //middleware
        check('email')
            .exists().withMessage('es Obligatorio')
            .isEmail().withMessage('no es válido'),
            
        check('password')
            // .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
            // .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
            .isLength({min: 6}).withMessage('debe tener al menos 6 carácteres'),
        
        fieldsValidator
    ],
    userLogin);

router.get('/renew', jwtValidator, revalidateToken);
router.put('/', jwtValidator, updateUser)

module.exports = router;

