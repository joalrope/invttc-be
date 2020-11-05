const {request, response} = require('express');
const SparePart = require('../models/SparePart');

/* 
Modelo de la Base de Datos MongoDB
{
    "id": "5f9c3df4b77fe909bd6feb61",
    "code": "P551712",
    "category": "FILTER",
    "title": "FUEL-FILTER",
    "info": [
        {
            "trademark": "DONALDSON",
            "loc-qty": [
                {
                    "location": "RACK-04-D3",
                    "qty": 38
                },
                {
                    "location": "25-A5",
                    "qty": 12
                }
            ],
            "costPrice": 7.036005,
            "salePrice": 22
        },
        {
            "trademark": "BALDWIN",
            "loc-qty": [
                {
                    "location": "RACK-04-D4",
                    "qty": 5
                }
            ],
            "costPrice": 9.65,
            "salePrice": 27
        }
    ],
    "replacement": [],
    "measurement": [],
    "status": "USADO"
}
*/
// Funcion que obtiene todos los productos del inventario
const getSpareParts = async (req = request, res = response ) => {

    try {
        const spareParts = await SparePart.find();
        
        res.json({
            ok: true,
            msg: 'Obtener repuestos',
            result: spareParts
        });

    } catch (error) {
        msgError(res, error);
    }
}


const createSparePart = async (req = request, res = response ) => {

    const newSparePart = new SparePart(req.body);
    const { code } = newSparePart;
    console.log(code);
    console.log(newSparePart);

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
        msgError(res, error);
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
        msgError(error);
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

        const updatedQty = await SparePart.updateOne({code},
                                                     {$inc: {'info.$[inf].loc_qty.$[loc].qty': qty}},
                                                     {arrayFilters: [{'inf.trademark': trademark}, {'loc.location': location}]});    

        res.json({
            // '/123456'
            ok: true,
            msg: 'Actualizada Cantidad del Repuesto',
            // result: sparePart
            result: updatedQty
        });

    } catch (error) {
        msgError(error);
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
        msgError(error);
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
        msgError(error);
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
        msgError(error);
    }
}


const msgError = (res, err) => {
    console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
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
