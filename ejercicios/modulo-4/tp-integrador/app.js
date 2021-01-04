/* Falta:
- todos los try de PERSONA

- verificaciones:
    - que el usuario no envie los campos requeridos solo con espacios en blanco
    - guardar en mayusculas los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.

estado de la app (validaciones y testeo):
- CATEGORIA:
    - GET: OK
    - GET + id: OK
    - POST: OK
    - DELETE: OK

- LIBRO:
    - GET: OK
    - GET + id: OK
    - POST: OK
    - PUT: OK (duda sobre datos que pueden modificarse)
    - DELETE: verificar
    
- PERSONA: verificar todo
    - GET: OK
    - GET + id: OK
    - POST: OK
    - DELETE: OK
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

/* ========== DOCUMENTACION API ========== */
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
        res.status(413).send({ "mensaje": e.message })
    }
});
// GET para solo una categoria
app.get('/categoria/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM categoria WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        // verifica si la categoria existe
        if (respuesta.length === 0) {
            throw new Error("Categoria no encontrada");
        }

        res.status(200).send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// POST para agregar una categoria
app.post('/categoria', async (req, res) => {
    try {
        // verifica si se agregó un nombre
        if (!req.body.nombre_categoria) {
            throw new Error("Debes enviar un nombre para agregar una categoria!");
        }

        // valida que no se ingrese un nombre en blanco
        if (/^\s+$/.test(req.body.nombre_categoria)) {
            throw new Error("No es posible ingresar solo espacios en blanco en el nombre de la categoria");
        }
        const nombreUpperCased = req.body.nombre_categoria.toUpperCase();
        
        // verifica si el nombre ya existe
        let query = 'SELECT nombre_categoria FROM categoria WHERE nombre_categoria = ?';

        let respuesta = await utilQuery(query, nombreUpperCased);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre de categoria ya existe!");
        }
        // insert
        query = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';

        respuesta = await utilQuery(query, nombreUpperCased);

        res.status(200).send({ "respuesta": respuesta.insertId, "nombre": nombreUpperCased });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// DELETE una categoria
app.delete('/categoria/:id', async (req, res) => {
    try {
        // verifica si la categoria existe o no
        let query = 'SELECT id FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("No existe la categoria indicada");
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
        res.status(413).send({ "mensaje": e.message })
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
        res.status(413).send({ "mensaje": e.message })
    }
});
// GET solo un libro
app.get('/libro/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, req.params.id);

        // verifica si el libro existe
        if (respuesta.length === 0) {
            throw new Error("No se encuentra ese libro");
        }

        res.status(200).send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// POST libro
app.post('/libro', async (req, res) => {
    try {
        // valida datos obligatorios (nombre_libro, categoria_id)
        if (!req.body.nombre_libro || !req.body.categoria_id) {
            throw new Error("Nombre y categoria son datos obligatorios!");
        }

        // valida que no se ingrese un nombre en blanco
        if (/^\s+$/.test(req.body.nombre_libro)) {
            throw new Error("No es posible ingresar solo espacios en blanco en el nombre del libro");
        }

        // si el campo "descripción" viene vacio se le agrega un array vacio
        if (!req.body.descripcion) {
            req.body.descripcion = "";
        };

        // Valida que exista la categoria
        let query = 'SELECT * FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [req.body.categoria_id]);

        if (respuesta.length == 0) {
            throw new Error("No existe la categoria indicada!");
        }

        // valida si el valor del campo "persona_id" referencia a una persona existente
        if (req.body.persona_id > 0) {
            query = 'SELECT id FROM persona WHERE id = ?';

            respuesta = await utilQuery(query, [req.body.persona_id]);

            if (respuesta.length == 0) {
                throw new Error("No existe la persona indicada!");
            }
        };

        // valida si el campo "persona_id" esta vacio. En ese caso le da el valor null
        if (!req.body.persona_id) {
            req.body.persona_id = null;
        };

        // const 
        const nombre_libro = req.body.nombre_libro.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase()
        const categoria_bd = req.body.categoria_id;
        const persona = req.body.persona_id;

        // Valida libro en BD
        query = 'SELECT * FROM libro WHERE nombre_libro = ?';

        respuesta = await utilQuery(query, [nombre_libro]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre de libro ya existe!");
        }

        // Insertar registro en la BD
        query = 'INSERT INTO libro (nombre_libro, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)';
        respuesta = await utilQuery(query, [nombre_libro, descripcion, categoria_bd, persona]);

        res.status(200).send({ "id": req.params.id, "nombre": nombre_libro, "descripcion": descripcion, "categoria_id": categoria_bd, "persona_id": persona });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// PUT libro
app.put('/libro/:id', async (req, res) => {
    try {
        // valida todos los datos
        if (!req.body.nombre_libro || !req.body.descripcion || !req.body.categoria_id || !req.body.persona_id) {
            throw new Error("Ingresar los datos completos");
        }

        // valida que no se ingrese un nombre en blanco
        if (/^\s+$/.test(req.body.nombre_libro)) {
            throw new Error("No es posible ingresar solo espacios en blanco en el nombre del libro");
        }

        // Valida libro en BD
        query = 'SELECT * FROM libro WHERE nombre_libro = ?';

        respuesta = await utilQuery(query, [req.body.nombre_libro]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre de libro ya existe!");
        }

        // si el campo "descripción" viene vacio o no existe se le agrega un array vacio
        if (!req.body.descripcion) {
            req.body.descripcion = "";
        };

        // Valida que exista la categoria
        let query = 'SELECT * FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [req.body.categoria_id]);

        if (respuesta.length == 0) {
            throw new Error("No existe la categoria indicada!");
        }

        // valida si el valor del campo "persona_id" referencia a una persona existente
        if (req.body.persona_id > 0) {
            query = 'SELECT id FROM persona WHERE id = ?';

            respuesta = await utilQuery(query, [req.body.persona_id]);

            if (respuesta.length == 0) {
                throw new Error("No existe la persona indicada!");
            }
        };

        // valida si el campo "persona_id" esta vacio. En ese caso le da el valor null
        if (!req.body.persona_id) {
            req.body.persona_id = null;
        };

        // const 
        const nombre_libro = req.body.nombre_libro.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase()
        const categoria_bd = req.body.categoria_id;
        const persona = req.body.persona_id;


        // Se realiza la actualización de la base de datos
        query = 'UPDATE libro SET nombre_libro = ?, descripcion = ?, categoria_id = ?, persona_id = ? WHERE id = ?';

        respuesta = await utilQuery(query, [nombre_libro, descripcion, categoria_bd, persona, req.params.id]);

        res.status(200).send({ "id": req.params.id, "nombre": nombre_libro, "descripcion": descripcion, "categoria_id": categoria_bd, "persona_id": persona });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// PUT libro prestar
app.put('/libro/prestar/:id', async (req, res) => {
    try {

        // Verificación de datos ingresados: ID libro y Id persona a prestar
        if (!req.body.persona_prestamo || !req.params.id) {
            throw new Error("Es necesario que se ingresen correctamente el ID de la persona a prestar y el ID del libro");
        }

        // Verificación de que el libro exista

        let qy = 'SELECT * FROM libro WHERE id = ?';

        let respuesta1 = await utilQuery(qy, [req.params.id]);

        if (respuesta1.length == 0) {
            throw new Error("Ese libro ingresado NO existe!");
        }

        // Verificación de que el USUARIO exista en la BD

        let consulta_usuario = 'SELECT * FROM persona WHERE id = ?';

        let respuesta = await utilQuery(consulta_usuario, [req.params.id, req.body.persona_prestamo]);

        if (respuesta.length == 0) {
            throw new Error("Ese usuario ingresado NO existe!");
        }

        // Verificación que el libro NO ESTE PRESTADO;

        let consulta_libro = 'SELECT * FROM libro WHERE id = ? AND persona_prestamo <> null';
        let respuesta_libro = await utilQuery(consulta_libro, [req.body.persona_prestamo]);

        if (!respuesta_libro) {
            throw new Error("Ese libro ya ha sido prestado");
        }

        // Se realiza la actualización de la base de datos
        query = 'UPDATE libro SET persona_prestamo = ? WHERE id = ?';

        respuesta2 = await utilQuery(query, [req.body.persona_prestamo, req.params.id]);

        // MENSAJE DE ACCIÓN DE MODIFICACION CON PUT CONCRETADO 
        res.status(200).send("El libro se prestó correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// PUT libro devolver
app.put('/libro/devolver/:id', async (req, res) => {
    try {

        // Verificación de datos ingresados: ID libro y nombre libro
        if (!req.body.nombre_libro || !req.params.id) {
            throw new Error("Es necesario que se ingresen correctamente el nombre del libro a devolver y el ID del libro");
        }

        //Validación de que los datos del libro sean correctos

        let query = 'SELECT * FROM libro WHERE nombre_libro = ? AND id = ?';

        let respuesta = await utilQuery(query, [req.body.nombre_libro, req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("Ese libro NO existe");
        }

        /*/Valido si ese libro estaba prestado
        
        if(req.persona_prestamo != null) {
            throw new Error("Ese libro no estaba prestado")
        }*/

        // Se realiza la actualización de la base de datos
        qy = 'UPDATE libro SET persona_prestamo = null WHERE id = ?';

        respuesta2 = await utilQuery(qy, [req.params.id]);

        // MENSAJE DE ACCIÓN DE MODIFICACION CON PUT CONCRETADO 
        res.status(200).send("El libro se devolvió correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// DELETE libro
app.delete('/libro/:id', async (req, res) => {
    try {
        //Validación de que los datos del libro sean correctos

        let query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("Ese libro NO existe");
        }
        //Valido si ese libro estaba prestado

        if (req.persona_prestamo != null) {
            throw new Error("Ese libro no estaba prestado")
        }
        // Se realiza la actualización de la base de datos
        qy = 'DELETE FROM libro WHERE id = ?';

        respuesta2 = await utilQuery(qy, [req.params.id]);
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});

/* ===== 3) PERSONA ===== */
// GET personas
app.get('/persona', async (req, res) => {
    try {
        const query = 'SELECT * FROM persona';

        const respuesta = await utilQuery(query);

        res.status(200).send({ "respuesta": respuesta });
    }

    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// GET una sola persona
app.get('/persona/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM persona WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        // verifica si la persona existe
        if (respuesta.length === 0) {
            throw new Error("No se encuentra esa persona");
        }

        res.status(200).send({ "respuesta": respuesta });
    }

    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// POST persona
app.post('/persona', async (req, res) => {

    try {
        // valida datos obligatorios
        if (!req.body.nombre || !req.body.apellido || !req.body.alias || !req.body.email) {
            throw new Error("Faltan datos, todos los campos son obligatorios");
        }

        // valida que no se ingrese un nombre en blanco
        if (/^\s+$/.test(req.body.nombre) || /^\s+$/.test(req.body.apellido) || /^\s+$/.test(req.body.alias) || /^\s+$/.test(req.body.email)) {
            throw new Error("No es posible ingresar solo espacios en blanco");
        }

        // valida que el email sea unico
        let query = 'SELECT email FROM persona WHERE email = ?';

        let respuesta = await utilQuery(query, [req.body.email]);

        if (respuesta > 0) {
            throw new Error("El email ya se encuentra registrado");
        }

        // strings toUpperCase
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();

        // Insertar registro en la BD
        query = 'INSERT INTO persona (nombre, apellido, alias, email) VALUES (?, ?, ?, ?)';
        respuesta = await utilQuery(query, [nombre, apellido, alias, email]);

        res.status(200).send({ "nombre": nombre, "apellido": apellido, "alias": alias, "email": email });
    }

    catch (e) {
        // el if convierte el mensaje de error del sistema en uno reconocible para el usuario
        if (e.code === 'ER_DUP_ENTRY') {
            console.error(e.message);
            res.status(413).send("El email ya se encuentra registrado");
        } else {
            console.error(e.message);
            res.status(413).send({ "mensaje": e.message })
        }
    }
});
// PUT persona
app.put('/persona/:id', async (req, res) => {
    try {
        // Verificación de datos ingresados: ID libro y datos obligatorios
        if (!req.params.id || !req.body.nombre || !req.body.apellido || !req.body.alias || !req.body.email) {
            throw new Error("Es necesario que se ingresen correctamente el ID de la persona y los datos correspondientes");
        }

        // valida que no se ingresen datos en blanco
        if (/^\s+$/.test(req.body.nombre) || /^\s+$/.test(req.body.apellido) || /^\s+$/.test(req.body.alias) || /^\s+$/.test(req.body.email)) {
            throw new Error("No es posible ingresar datos solo con espacios en blanco");
        }

        // valida que el id corresponda a una persona existente
        let query = 'SELECT id FROM persona WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta == 0) {
            throw new Error("No existe esa persona");
        }

        // valida que el email sea unico
        query = 'SELECT email FROM persona WHERE email = ?';

        respuesta = await utilQuery(query, [req.body.email]);

        if (respuesta > 0) {
            throw new Error("El email ya se encuentra registrado");
        }

        // strings toUpperCase
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();


        // Se realiza la actualización de la base de datos
        query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ?, email = ? WHERE id = ?';

        respuesta = await utilQuery(query, [nombre, apellido, alias, email, req.params.id]);

        res.status(200).send({ "nombre": nombre, "apellido": apellido, "alias": alias, "email": email });
    }

    catch (e) {
        // el if convierte el mensaje de error del sistema en uno reconocible para el usuario
        if (e.code === 'ER_DUP_ENTRY') {
            console.error(e.message);
            res.status(413).send("El email ya se encuentra registrado");
        } else {
            console.error(e.message);
            res.status(413).send({ "mensaje": e.message })
        }
    }
});
// DELETE persona
app.delete('/persona/:id', async (req, res) => {
    try {
        //Valida que la persona este registrada
        let query = 'SELECT * FROM persona WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("Esa persona no existe");
        }

        // Valida si la persona tiene libros asociados
        query = 'SELECT persona_id FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta == req.params.id) {
            throw new Error("Esa persona tiene libros asociados, no se puede eliminar");
        }

        // borrar el registro
        query = 'DELETE FROM persona WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);

        res.status(200).send("El registro se borro correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});

/* ========== SERVIDOR ========== */
app.listen(port, (req, res) => console.log("Server listening on port " + port));