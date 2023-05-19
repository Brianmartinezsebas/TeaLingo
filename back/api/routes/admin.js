const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');


const private_key = "m3t1r4r0nl4m4l4" // clave "privada" para encriptar o verificar el token JTW


router.get('/', (req, res) => {
});

function verifyAdmin(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No estas autorizado');

    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const deco = jwt.decode(token);
        const content = jwt.verify(token, private_key, function (err, decoded) {
            if (err || deco.rolId === "admin") {
                return res.status(401).json("invalidtoken");
            }
        });
        req.data = content;
        next();
    } else {
        return res.status(401).json("notoken");
    }
}

module.exports = router;
