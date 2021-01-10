// consulta a models
const libroModel = require('../models/libro');

module.exports = {
    traerTodosLosLibros: async () => {
        const listadoLibros = await libroModel.traerTodosLosLibros();

        return listadoLibros;
    },

    traerUnLibro: async (id) => {
        const unLibro = await libroModel.traerUnLibro(id);

        return unLibro;
    },

    guardarUnLibro: async libro => {
        const id = await libroModel.guardarUnlibro(libro);
        libro.id = id;
        console.log("id que traigo del model: ", id);
        console.log("id que le pongo al libro: ", libro.id);

        return libro;
    },

    modificarLibro: async (id, libro) => {
        const resultado = await libroModel.modificarLibro(id, libro.descripcion);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },

    prestarLibro: async (id, libro) => {
        const resultado = await libroModel.prestarLibro(id, libro.persona_id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },

    devolverLibro: async id => {
        const resultado = await libroModel.devolverLibro(id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },

    borrarLibro: async id => {
        const resultado = await libroModel.borrarLibro(id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    }
}