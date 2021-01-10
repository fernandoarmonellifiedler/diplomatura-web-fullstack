// llama los services
const libroService = require('../services/libroService');

/* ===== 2) LIBRO ===== */
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

        // valida si el valor del campo "persona_id" hace referencia a una persona existente
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

        // declara variables
        const nombre_libro = req.body.nombre_libro.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase()
        const categoria_bd = req.body.categoria_id;
        const persona = req.body.persona_id;

        // valida que exista el libro indicado
        query = 'SELECT * FROM libro WHERE nombre_libro = ?';

        respuesta = await utilQuery(query, [nombre_libro]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre de libro ya existe!");
        }

        // Insertar libro en la BD
        query = 'INSERT INTO libro (nombre_libro, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)';
        respuesta = await utilQuery(query, [nombre_libro, descripcion, categoria_bd, persona]);

        // toma id del libro para agregar al res.send
        query = 'SELECT id FROM libro WHERE nombre_libro = ?';
        respuesta = await utilQuery(query, [nombre_libro])
        
        // send
        res.status(200).send({ "id": respuesta[0].id, "nombre": nombre_libro, "descripcion": descripcion, "categoria_id": categoria_bd, "persona_id": persona });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
// PUT libro
app.put('/libro/:id', async (req, res) => {
    try {
        // valida que se ingresen todos los datos
        if (req.body.descripcion == "") {
            throw new Error("El campo 'descripcion' no puede estar vacio");
        }

        // problema: null en "persona_id" es tomado como campo inexistente si se coloca
        if (!req.body.nombre_libro || !req.body.descripcion || !req.body.categoria_id ) {
            throw new Error("Ingresar los datos obligatorios");
        }

        // valida que no se ingrese un nombre en blanco
        if (/^\s+$/.test(req.body.nombre_libro)) {
            throw new Error("No es posible ingresar solo espacios en blanco en el nombre del libro");
        }

        // Valida que exista la categoria 
        let query = 'SELECT * FROM categoria WHERE id = ?';

        let respuesta = await utilQuery(query, [req.body.categoria_id]);

        if (respuesta.length == 0) {
            throw new Error("No existe la categoria indicada!");
        }

        // valida que la categoria_id del libro y la proporcionada coincidan
        query = 'SELECT * FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        
        if (respuesta[0].categoria_id != req.body.categoria_id) {
            throw new Error("El número de categoria no coincide con la del ID proporcionado. No es posible alterar la categoría a la que pertenece el libro, solo su descripción");
        }

        // valida que la informacion de "persona_id" coincida
        query = 'SELECT * FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        
        if (respuesta[0].persona_id != req.body.persona_id) {
            throw new Error("El valor de 'persona_id' no coincide con la del ID proporcionado. Para alterar este valor direccione la petición a '/libro/prestar/:id' o '/libro/devolver/:id'.");
        }
        
        // declara variables
        const nombre_libro = req.body.nombre_libro.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase()
        const categoria_bd = req.body.categoria_id;
        const persona = req.body.persona_id;

        // Valida libro en BD y si coincide con id proporcionado
        query = 'SELECT * FROM libro WHERE nombre_libro = ? AND id = ?';

        respuesta = await utilQuery(query, [req.body.nombre_libro, req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("El nombre de libro no coincide con el del ID proporcionado. No es posible alterar el nombre del libro, solo su descripción");
        }

        // update de la BD
        query = 'UPDATE libro SET descripcion = ? WHERE id = ?';

        respuesta = await utilQuery(query, [descripcion, req.params.id]);

        // toma id del libro para agregar al res.send
        query = 'SELECT id FROM libro WHERE nombre_libro = ?';
        respuesta = await utilQuery(query, [nombre_libro])
        
        // send
        res.status(200).send({ "id": respuesta[0].id, "nombre": nombre_libro, "descripcion": descripcion, "categoria_id": categoria_bd, "persona_id": persona });
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
        if (!req.body.persona_id || !req.params.id) {
            throw new Error("Es necesario que se ingresen correctamente el ID de la persona a prestar y el ID del libro");
        }

        // Verifica que el libro exista
        let query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("No se encontro el libro");
        }

        // Verifica que el USUARIO exista
        query = 'SELECT * FROM persona WHERE id = ?';

        respuesta = await utilQuery(query, [req.body.persona_id]);

        if (respuesta.length == 0) {
            throw new Error("No se encontro la persona a la que se quiere prestar el libro");
        }

        // Verificación que el libro NO este prestado
        query = 'SELECT persona_id FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        
        if (respuesta[0].persona_id != null) {
            throw new Error("El libro ya ha sido prestado");
        }

        // Se realiza la actualización de la base de datos
        query = 'UPDATE libro SET persona_id = ? WHERE id = ?';

        respuesta = await utilQuery(query, [req.body.persona_id, req.params.id]);

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
        // Verificación de datos ingresados: ID libro y Id persona a prestar
        if (!req.params.id) {
            throw new Error("Es necesario que ingrese correctamente el ID del libro a devolver");
        }

        // valida que el libro exista
        let query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("No se encontro el libro");
        }

        // valida que el libro ESTE prestado
        query = 'SELECT persona_id FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        
        if (respuesta[0].persona_id == null) {
            throw new Error("El libro no ha sido prestado aún");
        }

        // update de la base de datos
        query = 'UPDATE libro SET persona_id = null WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);

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
        //Valida de que los datos del libro sean correctos
        let query = 'SELECT * FROM libro WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length == 0) {
            throw new Error("Ese libro no existe");
        }

        // Verifica que el libro NO ESTE PRESTADO;
        query = 'SELECT persona_id FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        
        if (respuesta[0].persona_id != null) {
            throw new Error("El libro ha sido prestado, no se puede borrar");
        }

        // delete del libro de la BD
        query = 'DELETE FROM libro WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);

        res.status(200).send("El libro se borró correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});
