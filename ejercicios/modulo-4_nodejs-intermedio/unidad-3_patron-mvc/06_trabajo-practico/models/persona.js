// consulta a la bd
const conexion = require('../db');

/* ===== 3) PERSONA ===== */
module.exports = {
    traerTodasLasPersonas: async () => {
        const listadoPersonas = await conexion.query('SELECT * FROM persona');

        return listadoPersonas;
    },

    traerUnaPersona: async () => {
        const unaPersona = await conexion.query('SELECT * FROM persona WHERE id = ?', [id]);

        return unaPersona[0];
    },

    guardarUnaPersona: async persona => {
        const result = await conexion.query('INSERT INTO persona (nombre, apellido, nickname, edad, email) VALUES (?)', [persona.nombre, persona.apellido, persona.nickname, persona.edad, persona.mail]);// faltan partes

        return result.resultId;
    },

    modificarPersona: async (id, edad, mail) => {
        const result = await conexion.query('UPDATE persona SET edad = ?, email = ? WHERE id = ?', [edad, email, id]);//check si esta completo

        return result.changedRows;
    },

    borrarPersona: async id => {
        const fecha = new Date();
        const result = await conexion.query('UPDATE persona SET deleted = ?, date_deleted = ? WHERE id = ?', [id, fecha, id]); //check si esta completo

        return result.affectedRows;
    }
}