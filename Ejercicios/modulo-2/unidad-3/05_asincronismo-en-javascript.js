/* Asincronismo en Javascript:
Video: https://www.youtube.com/watch?v=NkuJmzHXkQY&t=1203s
====================================
Conceptos importantes: 
- asincronía: suceso que no tiene lugar en total correspondencia temporal con otro suceso.

- paralelismo: múltiples tareas de forma simultánea.

- bloqueante: una tarea no devuelve el control hasta que se ha completado.
- no bloqueante: una tarea devuelve inmediatamente con independencia del resultado. Si esta completo devuelve datos sino, un error.

- síncrono: las tareas se ejecutan de forma secuencial, se debe esperar a que se complete para continuar con la siguiente tarea.
- asíncrono: las tareas pueden ser realizadas más tarde, lo que hace posible que una respuesta sea procesada en diferido.

- EventLoop (bucle de eventos): es un patrón de diseño que espera y distribuye eventos y/o mensajes en un programa.

====================================
Entonces, JavaScript es un lenguaje de programación asíncrono y no bloqueante con un bucle de eventos (eventLoop) implementado con un único hilo para sus interfaces de I/O (input/output - entrada/salida).
====================================
Formas de manejar la asincronía en JS:
- callbacks
- promises
- async/away: 
- generators
====================================
01_ callbacks: una función que se pasa como argumento de otra función y que será invocada. */

function sum(num1, num2) {
    return num1 + num2;
}

// aqui el callback será una función dada según el caso
function calc(num1, num2, callback) { 
    return callback(num1, num2);
}

console.log(calc(2,2,sum)); // 4

/* ====================================
02_promises: función no-bloqueante y asíncrona la cual puede retornar un valor ahora, en el futuro o nunca.
- se introduce con ECMAScript 6. */

const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('Hey :D');
        } else {
            reject('Whoops!');
        };
    });
};

somethingWillHappen()
    .then(response => console.log(response)); // Hey :D
    //.catch(err => console.error(err));

/* Ejemplo: 
- se está retornando una nueva promesa que tendrá dos argumentos que puede regresar en una función anónima (resolve y reject).
- el if ingresa una validación porque algo tiene que pasar para que la promesa suceda
- el .then nos regresará un response que nos regresará un string.
- el .catch nos va a devolver en caso de que ocurra un error o problema. va a "capturar" ese error para presentarlo. */

/*03_async/away: permite estructurar una función asincrónica sin bloqueo de una manera similar a una función sincrónica ordinaria.
- funciona también con promesas. */

const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('Do Something Async!'), 3000)
            : reject(new Error("Test error inside"));
    });
}

const doSomething = async () => {
    const something = await doSomethingAsync();
    console.log(something);
}

doSomething();
console.log('After doSomething()');

// After doSomething
// After 3000ms = Do Something Async!

/* Ejemplo:
- Creamos una nueva función o retornamos una nueva promesa. (lineas 66 a 72)
- Operador ternario (forma alternativa de hacer un if). If true, se ejecuta el setTimeout con el mensaje colocado. Sino se crea un error (new Error) para evitar exhibir solo una string y si un error. (lineas 68 a 70)
- Luego, tenemos una función que nos permite trabajar con async/await:
    - Tenemos la palabra reservada async, dentro podemos utilizar n veces la palabra await.
    - Aqui, el await va a aguardar a que la función/promesa doSomethingAsync() se ejecute para exhibir su resultado luego de 3 segundos. (linea 75)
    - Eso porque la premisa es verdadera, entonces se activa el setTimeout.
    - Esto no bloquea la función porque será ejecutado en el console.log
    - Finalmente, en la linea 79 se va a ejecutar la función doSomething pero veremos primero el console.log que le sigue porque dicha función se está ejecutando.
 */