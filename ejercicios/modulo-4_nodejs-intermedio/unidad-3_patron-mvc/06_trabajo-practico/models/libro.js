// consulta a la bd
const conexion = require('../db');

/* ===== 2) LIBRO ===== */
module.exports = {
    traerTodosLosLibros: async () => {
        const listadoLibros = await conexion.query('SELECT * FROM libro');

        return listadoLibros;
    },

    traerUnLibro: async (id) => {
        const unLibro = await conexion.query('SELECT * FROM libro WHERE id = ?', [id]);

        return unLibro[0];
    },

    guardarUnLibro: async libro => {
        const result = await conexion.query('INSERT INTO libro (nombre_libro, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)', [libro.nombre_libro, libro.descripcion, libro.categoria_bd, libro.persona]);// faltan partes

        return result.resultId;
    },

    modificarLibro: async (id, libro) => {
        const result = await conexion.query('UPDATE libro SET descripcion = ? WHERE id = ?', [libro.descripcion, id]); //check si esta completo

        return result.changedRows;
    },

    prestarLibro: async (id, libro) => {
        const result = await conexion.query('UPDATE libro SET persona_id = ? WHERE id = ?', [libro.persona_id, id]); //check si esta completo

        return result.changedRows;
    },

    devolverLibro: async id => {
        const result = await conexion.query('UPDATE libro SET persona_id = null WHERE id = ?', [id]); //check si esta completo

        return result.changedRows;
    },

    borrarLibro: async id => {
        const fecha = new Date();
        const result = await conexion.query('UPDATE libro SET deleted = ?, date_deleted = ? WHERE id = ?', [id, fecha, id]); //check si esta completo

        return result.affectedRows;
    }
}