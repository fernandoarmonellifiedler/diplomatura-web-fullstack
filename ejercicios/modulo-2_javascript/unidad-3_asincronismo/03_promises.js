/* Promises

- Es una abstracción de la programación asincrónica. Es un objeto que hace de
“interlocutor” entre la función que hace una operación asincrónica, y el llamador. El cual
(el “interlocutor”) maneja la respuesta de la función asincrónica (ya sea un valor o una
excepción).

- Si usamos una definición simplificada, podemos decir que es el resultado de una
operación asincrónica, cuyo estado puede ser pendiente, completada, o rechazada.


- Promises: Ventajas y Desventajas

Ventajas
● Código más legible.
● Es la forma más habitual de trabajar con procesos asincrónicos.
● Se utiliza en varios frameworks JavaScript (Angular, React, Node)
● Podemos concatenar funciones que procesan la respuesta.
● Podemos enfocarnos y trabajar por “partes”, dividiendo un problema complejo en
varios más pequeños.

Desventajas
● El código puede quedar ilegible fácilmente */

console.log("Paso 1");

procesoAsincronicoConPromise()
    .then(functionQueProcesaLaRespuestaOk)
    .catch(functionQueProcesaElError);

console.log("Paso 2");
/* ======================================= */
console.log("Paso 1");

procesoAsincronicoConPromise()
    .then(functionQueProcesaLaRespuestaOk)
    .then(functionQueProcesaAlFinalRespuestaOk)
    .catch(functionQueProcesaElError);

console.log("Paso 2");