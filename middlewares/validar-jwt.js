const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
    //* x-token headers
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        req.uid = payload.uid //TODO aqui estamos creando estas variable que la vamos a pasar como req
        req.name = payload.name
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido",
        });
    }

    next();
};

module.exports = {
    validarJWT,
};
