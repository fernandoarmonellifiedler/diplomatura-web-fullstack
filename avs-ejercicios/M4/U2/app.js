const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const port = process.env.PORT ? process.env.PORT : 3000;

// registro para base de datos
app.post('/registro', (req, res) => {

});


// logueo
app.post('/login', (req, res) => {

    if (!req.body.user || !req.body.pass) {
        res.send({ error: "No mandaste todos los datos" })
        return;
    }

    if (req.body.user == 'fer' && req.body.pass == "123") {

        const tokenData = {
            nombre: 'lala',
            apellido: 'lele'
        };

        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 24 // expires in 24 hs
        });

        res.send({token});

    } else {
        res.send({ error: "usuario y/o clave incorrecta" })
    }
});

// get
app.get('/producto', (req, res) => {
    let token = req.headers['authorization'];
    console.log(token);
    if(!token) {
        console.log('error');
        return;
    };
    // aqui me da error. token es undefined

    token = token.replace('Bearer ', '');

    jwt.verify(token, 'Secret', (err, user) => {
        if (err) {
            res.status(401).send({
                error: 'Token inválido'
            })
        } else {
            console.log('Esto es el user ', user)

            res.send({
                message: 'Awwww yeah!'
            })
        }
    });
});






app.listen(port, (req, res) => {
    console.log('Servidor escuchando en el puerto ', port);
});