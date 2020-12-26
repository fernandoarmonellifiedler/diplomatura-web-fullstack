/* Analicemos el código del middleware */

var myLogger = function (request, response, next) {
    console.log('-Ejecutando Logger-');
    next();
}

app.use(myLogger);

/* Las funciones middleware reciben 3 parámetros:

● request: petición que realiza el cliente
● response: respuesta que se le entrega al cliente
● next: próxima función de la cadena de ejecución (en este caso, como hay un único middleware, la próxima función es la que procesa la ruta app.get(‘/’, … */

var myLogger = function (request, response, next) {
    //...
}

// La función middleware, es guardada en una variable (myLogger), para luego poder utilizarla más adelante.

console.log('-Ejecutando Logger-');
next();

/* En la primer línea solo muestra por consola el mensaje -Ejecutando LoggerEn la línea siguiente, le indica a Express, que luego de ejecutar esta función middleware,
ejecute la siguiente función. En caso de no incluir el next(), no se ejecutará ninguna otra
función de la cadena de ejecución, siendo esta la última función en ejecutarse. La próxima
función en la cadena, puede ser otro middleware, o una ruta.

Es de suma importancia incluir el next() en caso que deseemos que siga la cadena de
ejecución.

En caso de no ejecutar el next() en el ejemplo anterior, la secuencia de ejecución sería la
del diagrama siguiente:

1) ======>  | 2) =====> | 3) ======  | 
Petiicion   |           | Middleware | Procesador
del cliente |  Express  | (myLogger) | de ruta
            |           |            | (app.get)
            | <===== 5) | <====== 4) |

Aqui podemos apreciar que la cadena de ejecución se termina en el middleware y
nunca es llamado el código que procesa la petición a la ruta específica.

Un ejemplo de caso en el cual NO deseamos que continúe la ejecución, puede ser
cuando realizamos una validación si el usuario ha ingresado en el sistema, y en caso que
no haya ingresado, lo podemos (desde el mismo middleware) redireccionar a la página de
login. En este caso, no deseamos pasar la ejecución a la próxima función (que puede ser
la ruta que coresponda) */

app.use(myLogger);

// El middleware no será ejecutado, a menos que le indiquemos a Express que incluya dicho middleware en la cadena de ejecución. Para incluirlo en la cadena de ejecución, utilizamos el método use del objeto Express.
