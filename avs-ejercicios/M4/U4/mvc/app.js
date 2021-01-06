const express = require('express');

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());

// ejemplo para POST /libro







app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
})