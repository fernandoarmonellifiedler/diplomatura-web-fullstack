// agrego el modelo

function guardarLibro(libro) {
    // aqui buscaria en persona, por ej, para ver si existe
    const existePersona = personaModel.existe(libro.persona_id);

    const existeGenero = generoModel.existe(libro.genero_id);
}