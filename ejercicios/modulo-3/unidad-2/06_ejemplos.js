/* En el siguiente ejemplo se puede ver una sencilla aplicación Express que escucha en el puerto 3000 y recibe peticiones HTML en la ruta ‘/hola’. En dicha ruta recibe 3 tipos de peticiones diferentes: get, post y put.*/

var express = require('express');
var app = express();
app.get('/hola', function (req, res) {
    res.send('Hola mundo en GET');
});
app.post('/hola', function (req, res) {
    res.send('Hola mundo en POST');
});
app.put('/hola', function (req, res) {
    res.send('Hola mundo en PUT');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
