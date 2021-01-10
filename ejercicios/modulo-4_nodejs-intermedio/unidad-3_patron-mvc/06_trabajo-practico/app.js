/* Info: En app.js queda la lógica de ruteo.

La conexión a la base de datos se realiza en archivo aparte que luego es incluída en los
diferentes modelos.
*/

/* ========== REQUIRES ========== */
const express = require('express');
const mysql = require('mysql');
const util = require('util');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* ========== MYSQL ========== */
// Para trabajar con base de datos mysql
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mybooks'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    }

    console.log('Conexion con base de datos mysql establecida');
});

const utilQuery = util.promisify(conexion.query).bind(conexion);

/* ========== DOCUMENTACION API ========== */
// - 1) Categoria
// - 2) Libro
// - 3) Persona

/* ========== SERVIDOR ========== */
app.listen(port, (req, res) => console.log("Server listening on port " + port));