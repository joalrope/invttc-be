const jwt = require('jsonwebtoken');


const generateJWT = (uid, name, role) => {

    return new Promise((resolve, reject) => {
        
        const payload = {uid, name, role};

<<<<<<< HEAD
    jwt.sign(payload, 'process.env.SECRET_JWT_SEED', {
      expiresIn: '0.5h',
    }, (err, token) => {resolve
=======
        jwt.sign(payload, 'process.env.SECRET_JWT_SEED', {
                expiresIn: '2h',
        }, (err, token) => {resolve
>>>>>>> 70cb2fd69070de6ee6e9a54be7dfc0d146c498ac

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