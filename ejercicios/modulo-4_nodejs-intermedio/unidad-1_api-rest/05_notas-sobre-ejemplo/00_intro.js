/* This is an attempt for understand and learn about new concepts provided in the example given by teachers.
From top to bottom of the code, will make comments in order to better compreend the examples provided.

File documentation on this folder:

01) All about MongoDB and Mongoose
02) About Express handlebars
03) Body-parser
04) Express-handlebar

turn off funds on npm:
npm config set fund false 
*/

/* ===== index.js file ===== */
var express = require('express');
var app = express();

/* ----- Mongoose ----- */
var mongoose = require('mongoose'); // includes the mongoose library
var ArtistaModel = require("../06_ejemplo-api-rest/models/artistaModel"); // creates mongoose models
var CancionModel = require("../06_ejemplo-api-rest/models/cancionModel");

// Conexion con la base de datos MongoDB
mongoose.connect('mongodb://localhost/curso_nodejs_intermedio_m1u2', {}).then( () => { // .then is form promises

    // Conexion exitosa
    console.log('Conexion exitosa con MongoDB');
}).catch( (err) => {
    console.log('No me pude conectar con MongoDB');
    console.log(err);
})

/* ----- Body-parser ----- */
var body_parser = require("body-parser");
// La informacion enviada por POST de un formulario se recibe en req.body
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

/* ----- Express-handlebars ----- */
var handlebars = require('express-handlebars')
    .create({ 'defaultLayout': 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// ---------------------------------------
// Funcion que se va a ejecutar en cada peticion
var myLogger = function(req, res, next) {
    console.log('Paso por el logger');
    next();
}

// Funcion handler de errores
var myErrorHandler = function(error, req, res, next) {
    console.log('Paso por el manejador de errores');
    console.log(error.message); // Mensaje de error
    res.status(error.status || 500); // Retornamos el estado del error o 500 si no tiene estado
    res.send(error.message);
}

app.use(myLogger);

// ---------------------------------------
// Primer uso de handlebars
app.get('/', function (request, response) {
    response.render('principal'); // views/principal.handlebars
    //response.send('Bienvenido al curso de NodeJS nivel Intermedio!');
});

// views/principal.handlebars esta renderizado en la respuesta al acceso a la carpeta raiz
//<h2>Principal</h2>
//<p>Un texto que acompaña a la página principal</p>