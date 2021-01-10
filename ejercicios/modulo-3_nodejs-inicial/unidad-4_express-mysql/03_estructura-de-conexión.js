/* Estructura de conexión a una base de datos SQL en Express

Para conectar una base de datos SQL en Express se requiere:
1. Incluir la conexión a Express
2. Incluir la biblioteca “mysql”
3. Generar la estructura de conexión
4. Conectar

La estructura de conexión es:*/

// Para trabajar con base de datos
var mysql = require('mysql');
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

conexion.connect();

// Se debe indicar el nombre de la base de datos (como se creo en PhpMyAdmin) y los datos de host, usuario y contraseña que también son definidos previamente en el PhpMyAdmin.

/* ===============================
Conexión a la base de datos MySQL desde Express */

var express = require('express');
var app = express();

// Para trabajar con base de datos
var mysql = require('mysql');
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

conexion.connect();