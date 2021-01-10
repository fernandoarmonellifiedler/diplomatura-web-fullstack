const express = require('express');

const app = express();

const myLogger = function (req, res, next) {
    console.log('-Ejecutando Logger-');
    next();
}
// middleware
app.use(myLogger);

app.get('/', function (req, res) {
    res.send('Bienvenido al Curso!');
})



// server
app.listen(3000, (req, res) => console.log("Server listening on port 3000"));