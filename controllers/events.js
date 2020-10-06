const {request, response} = require('express');
const Event = require('../models/Event');



const getEvents = async (req = request, res = response ) => {

    events = await Event.find()
                        .populate('user', 'name');
    
    res.json({
        ok: true,
        msg: 'Obtener eventos',
        events
    });
}


const createEvent = async (req = request, res = response ) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;  //req.id es definido por jwtValidator, que se dispara al accesar a una ruta
        const savedEvent = await event.save()

        res.json({
            ok: true,
            msg: 'Evento creado',
            event: savedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const updateEvent = async (req = request, res = response ) => {

    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Evento con ese id'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const newData = {
            user: req.uid,
            ...req.body
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, newData, {new: true});

        res.json({
            // '/123456'
            ok: true,
            msg: 'Actualizar evento',
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const deleteEvent = async (req = request, res = response ) => {

    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Evento con ese id'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para Eliminar este evento'
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.json({
            // '/123456'
            ok: true,
            msg: 'Evento eliminado'
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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
