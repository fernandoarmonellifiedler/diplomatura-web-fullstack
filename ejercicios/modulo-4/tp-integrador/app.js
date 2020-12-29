/* Falta:
- todos los try de las peticiones
- verificaciones:
    - que el usuario no envie los campos requeridos solo con espacios en blanco
    - guardar en mayusculas los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.

*/

/* ========== REQUIRES ========== */
const express = require('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// para trabajar con async/await en la conexion mysql
const utilQuery = util.promisify(conexion.query).bind(conexion);

/* ========== TODAS LAS PETICIONES AL SERVIDOR ========== */
// Orden de las tablas de la base de datos:
// - 1) Categoria
// - 2) Libro
// - 3) Persona

/* ===== 1) CATEGORIA ===== */
// GET para todas las categorias
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
// GET para solo una categoria
app.get('/categoria/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM categoria WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        // // verifica si la categoria existe
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
// POST para agregar una categoria
app.post('/categoria', async (req, res) => {
    try {
        // verifica si se agregó un nombre
        if (!req.body.nombre_categoria) {
            throw new Error("Debes enviar un nombre para agregar una categoria!");
        }

        const nombreUpperCased = req.body.nombre_categoria.toUpperCase();
        // verifica si el nombre ya existe
        let query = 'SELECT nombre_categoria FROM categoria WHERE nombre_categoria = ?';

        let respuesta = await utilQuery(query, nombreUpperCased);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!"); 
        }
        // insert
        query = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';

        respuesta = await utilQuery(query, nombreUpperCased);

        res.status(200).send({ "respuesta": respuesta.insertId, nombreUpperCased });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// DELETE una categoria
app.delete('/categoria/:id', async (req, res) => {
    try {
        // verifica si la categoria existe o no
        let query = 'SELECT id FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("Esa categoria no existe!"); 
        }
        // verifica si tiene libros asociados
        query = 'SELECT categoria_id FROM libro WHERE categoria_id = ?'

        respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length > 0) {
            throw new Error("Esa categoria aún tiene libros asociados! No se puede eliminar"); 
        }

        // delete
        query = 'DELETE FROM categoria WHERE id = ?';
        respuesta = await utilQuery(query, [req.params.id]);

        res.status(200).send("La categoria se borro correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ===== 2) LIBRO ===== */
// GET todos los libros
app.get('/libro', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// GET solo un libro
app.get('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// POST libro
app.post('/libro', async (req, res) => {
    try {
        if (!req.body.nombre_libro) {
            throw new Error("Debes enviar un nombre para agregar una libro!");
        }

        const nombreUpperCased = req.body.nombre_libro.toUpperCase();

        let query = 'SELECT nombre_libro FROM libro WHERE nombre_libro = ?';

        let respuesta = await utilQuery(query, nombreUpperCased);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!"); 
        }
        /*problemas para agregar un libro
        //query = 'INSERT INTO libro (id, nombre_libro, descripcion, categoria_id, persona_id) VALUES (?)';
        query = 'INSERT INTO libro (nombre_libro, descripcion, categoria_id, persona_id) VALUES ([nombreUpperCased], [req.body.descripcion], [req.body.categoria_id], [req.body.persona_id])';

        //respuesta = await utilQuery(query, [[nombreUpperCased], [req.body.descripcion], [req.body.categoria_id], [req.body.persona_id]]);

        respuesta = await query;

        res.status(200).send({ "respuesta": respuesta.insertId, nombreUpperCased });
        */
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// PUT libro
app.put('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// PUT libro prestar
app.put('/libro/prestar/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// PUT libro devolver
app.put('/libro/devolver/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// DELETE libro
app.delete('/libro/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ===== 3) PERSONA ===== */
// GET personas
app.get('/persona', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// GET una sola persona
app.get('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// POST persona
app.post('/persona', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// PUT persona
app.put('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// DELETE persona
app.delete('/persona/:id', async (req, res) => {
    try {



    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ========== SERVIDOR ========== */
app.listen(port, (req, res) => console.log("Server listening on port " + port));