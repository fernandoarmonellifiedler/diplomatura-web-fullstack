const express = require('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;
app.use(express.json());

// Conexion a MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listacompras'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    }

    console.log('Conexion con base de datos mysql establecida');
});

// para trabajar con async/await en la conexion mysql agregamos:
const qy = util.promisify(conexion.query).bind(conexion);

// Desarrollo de la logica de negocio 
app.get('/categorias', async (req, res) => {
    try {
        const query = 'SELECT * FROM categorias'; // consulta SQL

        const respuesta = await qy(query);

        res.send({ "respuesta": respuesta })
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});






// servidor
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ', port);
});