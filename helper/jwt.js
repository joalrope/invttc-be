const jwt = require('jsonwebtoken');


const generateJWT = (uid, role, name) => {

    return new Promise((resolve, reject) => {
        
        const payload = {uid, name};

        jwt.sign(payload, 'process.env.SECRET_JWT_SEED', {
                expiresIn: '2h',
        }, (err, token) => {resolve

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        });
    });
}


module.exports = {
    generateJWT
}