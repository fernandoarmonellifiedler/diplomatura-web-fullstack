/* Consigna:
Crear un formulario de registro con los siguientes datos: nombre, apellido, edad, número de
celular, país de nacimiento, país de residencia.

Recibir los datos en el servidor y armar otra página de respuesta que incluya los datos del usuario y un enlace a la página de registro nuevamente. */

var express = require('express');
var app = express();

app.use(express.urlencoded());
app.use(express.static('public'));


app.post('/form', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let mobile = req.body.mobile;
    let countryBirth = req.body.countryBirth;
    let countryResidence = req.body.countryResidence;

    let html = `
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Trabajo Práctico</title>
        </head>

        <body>
            <p>Hola ${firstName} ${lastName}.</p>
            <p>Hemos recibido tus datos!</p>
            <p>Nombre y apellido/s: ${firstName} ${lastName}</p>
            <p>Edad: ${age} años</p>
            <p>Celular: ${mobile}</p>
            <p>Pais de nascimiento: ${countryBirth}</p>
            <p>Pais de residencia: ${countryResidence}</p>
            <br />
            <a href="http://localhost:3000/">Ingresar otro registro</a>
        </body>
        </html>
        `;

    res.send(html);
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});