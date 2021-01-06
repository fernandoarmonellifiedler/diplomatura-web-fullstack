// service del libro



app.post('/libro', (req, res) => {
    try {
        if (!req.body.nombre || !req.body.categoria) {
            throw new Error("No se enviaron los datos requeridos");
        }

        const libro = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            categoria_id: req.body.categoria_id,
            persona_id: req.body.persona_id
        };

        const respuesta = libroService.guardarLibro(libro);

        if (respuesta) {
            res.send("Se guardó correctamente")
        }
        else {
            res.send("Hubo errores")
        }

    }
    catch(e) {
        console.log(e);
        res.status(413).send(e.message)
    }
}) 