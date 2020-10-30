const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helper/jwt');


const createUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el correo ${email}`
            });
        } else {  
            user = new User(req.body);

            //Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            
            user.password = bcrypt.hashSync(password, salt);

            await user.save();

            // Generar JWT (Json Web Token)
            const token = await generateJWT(user.id, user.name);
            
            res.status(201).json({
                ok: true,
                uid: user.id,
                name: user.name,
                role: 'basic',
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


const userLogin = async (req = request, res = response ) => {
    
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        // Verificar si existe el usuario 
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario y/o contraseña no son correctos`
            });
        }

        // Confirmar match del password enviado
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `Contraseña incorrecta`
            });
        }

        //Generar JWT (Json Web Token)
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


const revalidateToken = async(req, res = response ) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);
    
    res.json({
        ok: true,
        msg: 'Nuevo token',
        uid,
        name,
        token
    });
};


module.exports = {
    createUser,
    userLogin,
    revalidateToken
}
