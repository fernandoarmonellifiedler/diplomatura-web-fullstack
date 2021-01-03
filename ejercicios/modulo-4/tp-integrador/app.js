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
// Solicitudes a libros agregado por https://github.com/crisank
// GET todos los libros
app.get('/libro', async (req, res) => {
    try {
        const query = 'SELECT * FROM libro';

        let respuesta = await utilQuery(query);

        res.status(200).send({ "respuesta": respuesta });
    }

    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// GET solo un libro
// falta validar si el libro se encuentra en la bd
app.get('/libro/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, req.params.id);
        res.status(200).send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// POST libro
app.post('/libro', async (req, res) => {
    try {
        // validacion ok pero segun consigna deben recibirse todos los datos (nombre, categoria, descripcion, persona_id)
        if (!req.body.nombre_libro || !req.body.categoria_id) {
            throw new Error('Debe enviar correctamente los datos Nombre y Categoría del libro a ingresar');
        }
        // verificar: Si no se coloca "descripcion" da este error: "Cannot read property 'toUpperCase' of undefined". 
        const nombre_libro = req.body.nombre_libro.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase();
        const categoria_bd = req.body.categoria_id;
        console.log(categoria_bd)

        // Validación de libro en BD
        // no puedo validar porque no reconoce categoria
        let qy = 'SELECT * FROM libro WHERE nombre_libro = ?';

        let respuesta1 = await utilQuery(qy, [nombre_libro]);
        console.log(respuesta1);

        if (respuesta1.length > 0) {
            throw new Error("Ese nombre de libro ya existe!");
        }


        // VALIDA QUE NO SE INGRESEN ESPACIOS EN BLANCO EN NOMBRE
        // validacion ok
        if (/^\s+$/.test(nombre_libro)) {
            throw new Error("No es posible ingresar solo espacios en blanco en nombre libro");

        }


        // Validación de categoría para ingresar el libro
        // error: agrego una categoria existente y no la reconoce
        //let query = 'SELECT * FROM libro WHERE categoria_id = ?';
        let query = 'SELECT * FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [categoria_bd]);

        if (respuesta.length == 0) {
            throw new Error("Ese categoría no existe!");
        }


        // Insertar registro en la BD
        // cambiar "persona_prestamo" por "persona_id"
        query = 'INSERT INTO libro (nombre_libro, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)';
        respuesta = await utilQuery(query, [nombre_libro, descripcion, categoria_bd, req.body.persona_id]);

        res.status(200).send({ "respuesta": respuesta.insertId, nombre_libro });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// PUT libro
app.put('/libro/:id', async (req, res) => {
    try {
        // Validación de datos ingresados
        // validacion ok
        if (!req.body.nombre_libro) {
            throw new Error("No enviaste el nombre del libro");
        }
        
        let query = 'SELECT * FROM libro WHERE nombre_libro = ? AND id <> ?';
 
        let respuesta = await utilQuery(query, [req.body.nombre_libro, req.params.id]);
        // validacion ok
        if (respuesta.length > 0) {
            throw new Error("El nombre del libro que queres poner ahora ya existe");
        }
 
        // Se realiza la actualización de la base de datos
        query = 'UPDATE libro SET nombre_libro = ?, descripcion = ? WHERE id = ?';
 
        respuesta = await utilQuery(query, [req.body.nombre_libro.toUpperCase(), req.body.descripcion.toUpperCase(), req.params.id]);
 
        
        // Se realiza la consulta nuevamente para mostrar datos
        const consulta = 'SELECT * FROM libro WHERE id = ?';
 
        let respuesta1 = await utilQuery(consulta, req.params.id);
        res.status(200).send({ "respuesta": respuesta1 });
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