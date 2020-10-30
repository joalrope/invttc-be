const {request, response} = require('express');
const SparePart = require('../models/SparePart');

/* 
{
    "code": "7X3454",
    "description": "SEAL O RING",
    "category": "part",
    "equivalent": "",
    "location": "E23A4",
    "price": "5.45",
    "qty": "3"
}
*/

const getSpareParts = async (req = request, res = response ) => {

    const spareParts = await SparePart.find();
    
    res.json({
        ok: true,
        msg: 'Obtener repuestos',
        result: spareParts
    });
}


const createSparePart = async (req = request, res = response ) => {

    const sparePart = new SparePart(req.body);

    try {
        /* part.user = req.uid;  //req.uid es definido por jwtValidator, que se dispara al accesar a una ruta */
        const savedSparePart = await sparePart.save()

        res.json({
            ok: true,
            msg: 'Repuesto creado',
            result: savedSparePart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const updateSparePart = async (req = request, res = response ) => {

    try {
        const sparePart = await SparePart.findById(req.params.id);

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Repuesto con ese id'
            });
        }

        /* if (part.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este repuesto'
            });
        } */

        const newData = {
            ...req.body,
            user: req.uid
        }

        const updatedSparePart = await SparePart.findByIdAndUpdate(req.params.id, newData, {new: true});

        res.json({
            // '/123456'
            ok: true,
            msg: 'Actualizar repuesto',
            result: updatedSparePart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const deleteSparePart = async (req = request, res = response ) => {

    try {
        const sparePart = await SparePart.findById(req.params.id);

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Repuesto con ese id'
            });
        }

        /* if (part.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para Eliminar este evento'
            });
        } */

        await SparePart.findByIdAndDelete(req.params.id);

        res.json({
            // '/123456'
            ok: true,
            msg: 'Repuesto eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getSparePartById = async (req = request, res = response ) => {

    try {
        const sparePart = await SparePart.findById(req.params.id);

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Repuesto con ese id'
            });
        }

        res.json({
            // '/123456'
            result: sparePart,
            ok: true,
            msg: 'Obtener Repuesto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getSparePartByCode = async (req = request, res = response ) => {

    try {
        const sparePart = await SparePart.findOne({"code": 1261813 });

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Repuesto con ese id'
            });
        }

        res.json({
            // '/123456'
            result: sparePart,
            ok: true,
            msg: 'Obtener Repuesto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    getSpareParts: getSpareParts,
    getSparePartById: getSparePartById,
    getSparePartByCode: getSparePartByCode,
    createSparePart: createSparePart,
    updateSparePart: updateSparePart,
    deleteSparePart: deleteSparePart
}
