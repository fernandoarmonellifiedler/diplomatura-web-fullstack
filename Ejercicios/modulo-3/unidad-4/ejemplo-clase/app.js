const express = require('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;
app.use(express.json());

// Conexion a MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listacompras'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    }

    console.log('Conexion con base de datos mysql establecida');
});

// para trabajar con async/await en la conexion mysql agregamos:
const qy = util.promisify(conexion.query).bind(conexion);

// Desarrollo de la logica de negocio

/* ======== CATEGORIAS ======== */
// GET para devolver todas las categorias
app.get('/categorias', async (req, res) => {
    try {
        const query = 'SELECT * FROM categorias'; // consulta SQL

        const respuesta = await qy(query);

        res.send({ "respuesta": respuesta })
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});

// GET + id para devolver solo una categoria
app.get('/categorias/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM categorias WHERE id = ?';

        const respuesta = await qy(query, [req.params.id]);

        console.log(respuesta);

        res.send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});

// POST para guardar una categoria nueva
app.post('/categorias', async (req, res) => {
    try {
        // Validando envio de la info correctamente
        if (!req.body.nombre) {
            throw new Error('Falta enviar el nombre');
        };

        const nombre = req.body.nombre;

        // verificando que no exista la categoria
        let query = 'SELECT id FROM categorias WHERE nombre = ?';

        let respuesta = await qy(query, [nombre]);

        if (respuesta.length > 0) {
            throw new Error('Esa categoria ya existe');
        };

        // guardar nueva categoria
        query = 'INSERT INTO categorias (nombre) VALUE (?)';
        respuesta = await qy(query, [nombre]);

        // enviar respuesta
        res.send({ 'respuesta': respuesta.insertId })
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})

// PUT/update para modificar una categoria existente
app.put('/categorias/:id', async (req, res) => {
    try {
        if (!req.body.nombre) {
            throw new Error('No enviaste el nombre');
        }

        let query = 'SELECT * FROM categorias WHERE nombre = ? AND id <> ?';

        let respuesta = await qy(query, [req.body.nombre, req.params.id]);

        if (respuesta.length > 0) {
            throw new Error('El nombre de la nueva categoría ya existe');
        }

        query = 'UPDATE categorias SET nombre = ? WHERE id = ?';

        respuesta = await qy(query, [req.body.nombre, req.params.id]);

        res.send({ 'respuesta': respuesta.affectedRows })

    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});

// DELETE para borrar una categoria existente
app.delete('/categorias/:id', async (req, res) => {
    try {
        let query = 'SELECT * FROM producto WHERE categoria_id = ?';

        let respuesta = await qy(query, [req.params.id]);

        if (respuesta.length > 0) {
            throw new Error('Aun existen productos asociados. No es posible borrarla')
        };

        query = 'DELETE FROM categorias WHERE id = ?';

        respuesta = await qy(query, [req.params.id]);

        res.send({ 'respuesta': respuesta.affectedRows })

    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})

/* ======== PRODUCTOS ======== */
app.post('/productos', async (req, res) => {
    try {
        if (!req.body.nombre || !req.body.categoria_id) {
            throw new Error("No enviaste los datos obligtorios (nombre y categoria)");
        };

        let query = 'SELECT * FROM categorias WHERE id = ?';
        let respuesta = await qy(query, [req.body.categoria_id]);

        if (respuesta.length == 0) {
            throw new Error("Categoria no encontrada");
        };

        query = 'SELECT * FROM productos WHERE nombre = ?';
        respuesta = await qy(query, [req.body.nombre]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre de producto ya existe");
        };

        let descripcion = '';
        if (req.body.descripcion) {
            descripcion = req.body.descripcion;
        };

        query = 'INSERT INTO productos (nombre, descripcion, categoria_id) VALUES (?, ?, ?)';

        respuesta = await qy(query, [req.body.nombre, descripcion, req.body.categoria_id]);

        res.send({'respuesta': respuesta.insertId});
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})


/* ======== LISTA DE COMPRAS ======== */


// servidor
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ', port);
});