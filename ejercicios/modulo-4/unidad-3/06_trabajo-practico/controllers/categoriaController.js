// llama los services
const categoriaService = require('../services/categoriaService');

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

        // ingresa categoria a la BD
        query = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';

        respuesta = await utilQuery(query, nombreUpperCased);

        res.status(200).send({ "id": respuesta.insertId, "nombre": nombreUpperCased });
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

        res.status(200).send("La categoria se borró correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});