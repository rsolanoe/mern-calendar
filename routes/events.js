/* 
    Events Routes
    /api/events
*/
const express = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, updateEvento, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

// Todas las rutas pasan por la validación del JWT
router.use( validarJWT)

// Todas tienen que pasar por la validación del JWT
// Obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'El titulo es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento)

// Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvento)

// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router