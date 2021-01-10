/* Clase del 03/11:
==================================
- sobre callbacks: se usan para llamar a una funcion dentro de otra. La interna se va a ejecutar cuando termine la primera, por lo que el avance del programa puede realizarse de forma asincrónica sin interrumpir el funcionamiento del mismo.
- El problema es que el codigo puede quedar tan anidado que resulta dificil de seguir visualmente.
==================================
- una forma nueva para manejar esto es la promise:

pedirDatosAlumnos(
    resolve(tal cosa)
    reject(si da error)
)

- cuando se recibe una promise ocurren dos cosas:
.then, lo que será realizado cuando se ejecute el resolve 
.catch: aqui estan los errores cuando se genera un reject

- una promesa permite concatenar .then. 

- observacion: tanto callback como promise abre una bifurcacion en la linea del proceso
==================================
- async/await es una de las formas más sencillas de manejar procesos asincrónicos:
- en este caso se decide que el proceso es asincronico pero se decide esperar. No se ejecuta mas linea de codigo en tanto no se cumpla tal funcion

Ejemplos:
- async/await se puede usar casi siempre. pedir datos a un servidor.
- callback o promise: mandar al servidor una imagen mientras se llena el formulario. Mandar algo a imprimir.
==================================
setTimeOut y setInterval:
- se usan mucho. por ej: animacion de carga de una pagina
- desactivar un boton mientras se esta ejecutando alguna funcion.

-setTimeOut: espera x milisegundos antes de ejecutar la funcion. es una espera


*/
setTimeout(() => {
    console.log('ya esperé');
} , 3000);
//esto es una callback, se esta llamando una funcion adentro de otra. la callback es la funcion de adentro.

/* -setInterval: ejecuta la funcion cada x milisegundos. esto es un bucle 
setInterval(() => {
    console.log('estoy en el setInterval');
} , 1000); 

- agregar siempre un final para no ejecutar el loop => clearInterval
*/
let i = 0;

var intervalo = setInterval(() => {
    
    if (i < 10) {
        console.log('estoy en el setInterval');
        i++
    } else {
        clearInterval(intervalo);
    }
    
} , 1000); 

console.log(intervalo);