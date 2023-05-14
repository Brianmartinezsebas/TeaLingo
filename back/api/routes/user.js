const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');


const private_key = "m3t1r4r0nl4m4l4" // clave "privada" para encriptar o verificar el token JTW

router.get('/', (req, res) => {
});

// Ruta para el inicio de sesion
router.post('/singin', (req, res) => {
  const { userName, pass } = req.body;
  mysqlConnection.query('select userName,roleId from user where username=? and pass=?',
    [userName, pass],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, private_key);
          res.status(200).json({ token });
        } else {
          res.status(401).json('No founded');
        }
      } else {
        console.log(err);
      }
    }
  )
})

// ! Modelo de ruta con verificacion de sesion
// router.post('/test', verifyToken, (req, res) => {
//   res.json('Informacion secreta');
// })


function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('No estas autorizado');

  const token = req.headers.authorization.substr(7)
  if (token !== '') {
    try {
      const content = jwt.verify(token, private_key);
      req.data = content;
      next();
    } catch (err) {
      res.status(401).json('expiredtoken');
    }
  } else {
    return res.status(401).json('notoken');
  }
}

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