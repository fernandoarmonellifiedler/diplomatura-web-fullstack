/* This is an attempt for understand and learn about new concepts provided in the example given by teachers.
From top to bottom of the code, will make comments in order to better compreend the examples provided.

File documentation on this folder:

01) All about MongoDB and Mongoose
02) About Express handlebars
03) Body-parser
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

/* ----- Express-handlebars ----- */
var handlebars = require('express-handlebars')
    .create({ 'defaultLayout': 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// ---------------------------------------
