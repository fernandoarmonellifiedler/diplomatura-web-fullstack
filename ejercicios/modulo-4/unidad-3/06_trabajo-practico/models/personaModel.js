// llama los services

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

        if (respuesta.length > 0) {
            throw new Error("El email ya se encuentra registrado");
        }

        // strings toUpperCase
        const nombre = req.body.nombre.toUpperCase();
        const apellido = req.body.apellido.toUpperCase();
        const alias = req.body.alias.toUpperCase();
        const email = req.body.email.toUpperCase();

        // Inserta registro de persona en la BD
        query = 'INSERT INTO persona (nombre, apellido, alias, email) VALUES (?, ?, ?, ?)';
        respuesta = await utilQuery(query, [nombre, apellido, alias, email]);

        // toma id de persona para agregar al res.send
        query = 'SELECT id FROM persona WHERE nombre = ?';
        respuesta = await utilQuery(query, [nombre])
        
        // send
        res.status(200).send({ "id": respuesta[0].id,"nombre": nombre, "apellido": apellido, "alias": alias, "email": email });
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
        // Verifica datos ingresados: ID libro y datos obligatorios
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


        // update de la BD
        query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ?, email = ? WHERE id = ?';

        respuesta = await utilQuery(query, [nombre, apellido, alias, email, req.params.id]);

        // toma id de persona para agregar al res.send
        query = 'SELECT id FROM persona WHERE nombre = ?';
        respuesta = await utilQuery(query, [nombre])
        
        // send
        res.status(200).send({ "id": respuesta[0].id,"nombre": nombre, "apellido": apellido, "alias": alias, "email": email });
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
        query = 'SELECT persona_id FROM libro WHERE persona_id = ?';

        respuesta = await utilQuery(query, [req.params.id]);
        console.log(respuesta)
        if (respuesta.length > 0) {
            throw new Error("Esa persona tiene libros asociados, no se puede eliminar");
        }
        

        // borrar el registro de la persona de la BD
        query = 'DELETE FROM persona WHERE id = ?';

        respuesta = await utilQuery(query, [req.params.id]);

        res.status(200).send("El registro se borro correctamente");
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "mensaje": e.message })
    }
});