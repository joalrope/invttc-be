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

    const newSparePart = new SparePart(req.body);
    const { code } = newSparePart;

    try {
        let dbSparePart = await SparePart.findOne({code})
        
        if (dbSparePart) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un Repuesto con el código ${code}`
        })} else {

            const savedSparePart = await newSparePart.save()
    
            res.json({
                ok: true,
                msg: 'Repuesto creado',
                result: savedSparePart
            });  
        };

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
        const sparePart = await SparePart.findById(req.params.code);

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: `'No existe un Repuesto con el código ${req.params.code}`
            });
        }

        /* if (part.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este repuesto'
            });
        } */

        const newData = {
            ...req.body
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


const updateQtySparePart = async (req = request, res = response ) => {
    
    try {

        const {code, trademark, location, qty} = req.body;
        const sparePart = await SparePart.findOne({code});

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un Repuesto con el código: ${code}`
            });
        }
        let posLocation;
        let posTrademark;

        for (t in sparePart.info){
            if (sparePart.info[t].trademark === trademark) {
                posTrademark = t;
            };
        }

        for (l in sparePart.info[posTrademark].loc_qty) {
            if (sparePart.info[posTrademark].loc_qty[l].location === location) {
                posLocation = l
            }
        }

        const qtyField = JSON.parse(`{\"info.${posTrademark}.loc_qty.${posLocation}.qty\": ${qty}}`);

        const updatedQty = await SparePart.updateOne({code}, {$inc: qtyField});    
        
        res.json({
            // '/123456'
            ok: true,
            msg: 'Actualizada Cantidad del Repuesto',
            // result: sparePart
            result: updatedQty
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
            ok: true,
            msg: 'Obtener Repuesto',
            result: sparePart
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

    const mode = req.header('x-mode');
    const field = JSON.parse(`{\"${mode}\": 1, \"_id\": 0}`);

    try {
        const sparePart = await SparePart.find({code: { $regex: `^${req.params.code}`}}, (!!mode) ? field : {});

        if (!sparePart) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Repuesto con ese Código'
            });
        }

        res.json({
            ok: true,
            msg: 'Obtener Repuesto',
            result: sparePart
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
    updateQtySparePart: updateQtySparePart,
    deleteSparePart: deleteSparePart
}
