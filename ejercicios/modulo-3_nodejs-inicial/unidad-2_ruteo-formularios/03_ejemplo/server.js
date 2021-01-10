var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/procesar', function (req, res) {
    var fruta = req.body.fruta;
    var html = 'Tu fruta favorita es: ' + fruta + '.<br>' + '<a href="/ejemplo_formulario.html">Probar de nuevo</a>'
    res.send(html);
});

app.listen(3000, function() {
    console.log('Express iniciado en el puerto 3000.');
});