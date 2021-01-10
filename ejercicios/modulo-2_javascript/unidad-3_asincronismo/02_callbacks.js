/* Callbacks: ventajas y desventajas

Ventajas
● Muy conocidas (posiblemente las hayas usado)
● Se usa en muchas funciones
● Es sencillo para operaciones básicas

Desventajas
● El código puede quedar ilegible fácilmente */

// Ejemplo 1
function hacerALos3Seg() {
    console.log('Me llamo luego de 3 segundos');
}

console.log("Paso 1");
setTimeout(hacerALos3Seg, 3000);
console.log("Paso 2");


// Ejemplo 2
function doAsync1(fn) {
    console.log("doAsync1");
    fn();
}
function doAsync2(fn) {
    console.log("doAsync2");
    fn();
}
function doAsync3(fn) {
    console.log("doAsync3");
    fn();
}
function doAsync4(fn) {
    console.log("doAsync4");
    fn();
}

console.log("Iniciando");
doAsync1(function() {
    doAsync2(function() {
        doAsync3(function() {
            doAsync4(function() {});
        });
    });
});
console.log("Finalizando");