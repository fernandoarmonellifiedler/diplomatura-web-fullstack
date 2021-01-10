// consulta a la bd
const conexion = require('../db');

/* ===== 1) CATEGORIA ===== */
module.exports = {
    traerTodasLasCategorias: async () => {
        const listadoCategorias = await conexion.query('SELECT * FROM categoria');

        return listadoCategorias;
    },

    traerUnaCategoria: async () => {
        const unaCategoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [id]);

        return unaCategoria[0];
    },

    guardarUnaPersona: async categoria => {
        const result = await conexion.query('INSERT INTO categoria (nombre_categoria) VALUES (?)', [categoria.categoria_nombre]); // faltan partes

        return result.resultId;
    },

    borrarPersona: async id => {
        const fecha = new Date();
        const result = await conexion.query('UPDATE categoria SET deleted = ?, date_deleted = ? WHERE id = ?', [id, fecha, id]); //check si esta completo

        return result.affectedRows;
    }
}