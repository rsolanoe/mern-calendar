/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
// Nuevo Usuario
router.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min: 6,}),
        validarCampos
    ],
    createUser
);

// Autenticar
router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min: 6,}),
        validarCampos
    ],
    loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
