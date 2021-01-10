// consulta a models
const personaModel = require('../models/persona');

module.exports = {

    traerTodasLasPersona: async () => {
        const listadoPersonas = await  personaModel.traerTodasLasPersonas();

        return listadoPersonas;
    },

    traerUnaPersona: async (id) => {
        const unaPersona = await personaModel.traerUnaPersona(id);

        return unaPersona;
    },

    guardarUnaPersona: async persona => {
        const id = await personaModel.guardarUnaPersona(persona);
        persona.id = id;
        console.log("id que traigo del model: ", id);
        console.log("id que le pongo a la persona: ", persona.id);

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