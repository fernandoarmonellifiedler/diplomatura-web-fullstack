// consulta a models
const categoriaModel = require('../models/categoria');

module.exports = {
    traerTodasLasCategorias: async () => {
        const listadoCategorias = await categoriaModel.traerTodasLasCategorias();

        return listadoCategorias;
    },

    traerUnaCategoria: async (id) => {
        const unaCategoria = await categoriaModel.traerUnaCategoria(id);

        return unaCategoria;
    },

    guardarUnaCategoria: async categoria => {
        const id = await categoriaModel.guardarUnaCategoria(categoria);
        categoria.id = id;
        console.log("id que traigo del model: ", id);
        console.log("id que le pongo a la categoria: ", categoria.id);

        return categoria;
    },

    borrarCategoria: async id => {
        const resultado = await categoriaModel.borrarCategoria(id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    }
}