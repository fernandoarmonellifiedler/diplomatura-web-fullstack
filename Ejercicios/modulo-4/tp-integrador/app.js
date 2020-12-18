/* Falta:
- todos los try de las peticiones
- verificaciones:
    - que el usuario no envie los campos requeridos solo con espacios en blanco
    - guardar en mayusculas los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.
*/

const express = require('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// para trabajar con async/await en la conexion mysql
const utilQuery = util.promisify(conexion.query).bind(conexion);

/* ===== CATEGORIA ===== */
app.get('/categoria', async (req, res) => {
    try {
        const query = 'SELECT * FROM categoria';

        const respuesta = await utilQuery(query);

        res.status(200).send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.get('/categoria/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM categoria WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length === 0) {
            throw new Error("Categoria no encontrada");
        }

        res.status(200).send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.post('/categoria', async (req, res) => {
    try {
        if (!req.body.nombre_categoria) {
            throw new Error("Debes enviar un nombre para agregar una categoria!");
        }

        const nombre_categoria = req.body.nombre_categoria.toUpperCase();

        let query = 'SELECT id FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [nombre_categoria]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!");
        }

        query = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';
        respuesta = await utilQuery(query, [nombre_categoria]);
        console.log(respuesta);
        res.status(200).send({ "respuesta": respuesta.insertId, nombre_categoria });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.delete('/categoria/:id', async (req, res) => {
    try {
        /* falta:
            - validar si la categoria existe o no
            - validar si la categoria tiene datos asociados en la tabla LIBROS
         */

        let query = 'DELETE FROM categoria WHERE id = ?';
        let respuesta = await utilQuery(query, [req.params.id]);

        res.status(200).send("La categoria se borro correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ===== LIBRO ===== */
app.get('/libro', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.get('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.post('/libro', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.put('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.put('/libro/prestar/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.put('/libro/devolver/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.delete('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ===== PERSONA ===== */
app.get('/persona', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.get('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.post('/persona', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.put('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

app.delete('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

// Servidor
app.listen(port, (req, res) => console.log("Server listening on port " + port));