/* Concepto de middleware

El término middleware es ampliamente utilizado en diferentes tecnologías, aunque
teniendo diferentes definiciones para cada una de ellas. Cuando hablamos de middleware
estamos hablando de una capa intermedia (algo entre 2 cosas, que generalmente hace de
nexo entre ellas).

Cuando hablemos de middleware en express, estaremos hablando de un componente
que está diseñado para modificar una petición o respuesta HTTP, pero que generalmente
no da la respuesta. Está diseñado para ser encadenado (ejecución uno después del otro),
para formar una tubería de cambios de comportamiento durante el procesamiento de una
petición.

--------------------------------
Creación de un middleware

Son funciones que tienen acceso al objeto de petición (request), el de respuesta
(response), y a la función que le sucede (next) en el ciclo de ejecución de la aplicación. La
función siguiente (next), es una función que, cuando es llamada, ejecuta el siguiente
middleware.

Estas funciones son ejecutadas previo a las funciones específicas para una ruta.
Las funciones middleware pueden realizar las siguientes tareas:

● Ejecutar cualquier código
● Realizar cambios en el objeto petición (request) y en objeto respuesta (response)
● Finalizar el ciclo de una petición
● Llamar a la siguiente función middleware

Al finalizar cada función middleware se debe llamar a next() para que continúe la
ejecución de la siguiente función middleware o ruta. En caso de no llamarse a next(), no
se ejecutará ninguna otra función.

Veamos un ejemplo: */

var express = require('express');
var app = express();
var myLogger = function (req, res, next) {
    console.log('-Ejecutando Logger-');
    next();
}
app.use(myLogger);
app.get('/', function (req, res) {
    res.send('Bienvenido al Curso!');
})
app.listen(3000);

/* La salida del código es la siguiente:

Salida por consola: "Ejecutando Logger"
Respuesta al cliente (HTTP): "Bienvenido al Curso!"

Primero muestra por consola el mensaje -Ejecutando Logger- y luego respondiendo al
cliente con “Bienvenido al Curso!”

Como podemos ver en el ejemplo, la única ruta que concuerda con la petición de un GET
/ es la de la línea 11 (app.get….), pero igualmente se ejecuta el código de la función
guardada en la variable myLogger. Esto es porque myLogger es un middleware, un
código que se ejecuta antes de ejecutarse el código de la ruta, y luego se ejecuta el
código de la ruta específica.

Secuencia de ejecución

1) ======>  | 2) =====> | 3) ======> | 4) ======>
Petiicion   |           | Middleware | Procesador
del cliente |  Express  | (myLogger) | de ruta
            |           |            | (app.get)
            | <===== 6) | <=================== 5)

--------------------------------


*/