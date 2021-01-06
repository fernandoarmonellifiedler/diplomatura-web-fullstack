const personaModel = require('../models/persona');

module.exports = {

    guardarUnaPersona: async persona => {
        const id = await personaModel.guardarUnaPersona(persona);
        persona.id = id;
        console.log("id que traigo del model: ", id);
        console.log("id que le pongo a la persona: ", persona.id);

        return persona;
    },

    listarPersonas: async () => {
        const listaDePersonas = await personaModel.traerTodasLasPersonas();

        return listaDePersonas;
    },

    traerUnaPersona: async id => {
        const persona = await personaModel.traerUnaPersona(id);

        return persona;
    },

    modificarPersona: async (id, edad, mail) => {

        const resultado = await personaModel.modificarPersona(id, edad, mail);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },

    borrarPersona: async id => {
        const resultado = await personaModel.borrarPersona(id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    }
};