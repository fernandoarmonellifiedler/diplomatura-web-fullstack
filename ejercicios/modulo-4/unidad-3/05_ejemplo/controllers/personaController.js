const personaService = require('../services/personaService');

module.exports = {
    guardarUnaPersona: async persona => {
        const personaNueva = personaService.guardarUnaPersona(persona);

        return personaNueva;
    },

    listarPersonas: async () => {
        const listado = await personaService.listarPersonas();

        return listado;
    },

    traerUnaPersona: async id => {
        const persona = await personaService.traerUnaPersona(id);

        return persona;
    },

    modificarPersona: async (id, edad, mail) => {
        const persona = null;

        const resultado = await personaService.modificarPersona(id, edad, mail);

        if (resultado) {
            persona = await personaService.traerUnaPersona(id);
        }

        return persona;
    } // sigue...
}