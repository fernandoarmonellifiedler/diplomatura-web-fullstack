/* Implementacion de testeos

Mocha con Chai

Modularización - Estructura de carpeta
Para los test vamos a crear una carpeta a fin de mantener ordenado el trabajo. Entonces, dentro de la carpeta app vamos a crear la carpeta test:

app + test: carpeta en la cual incluímos todos los tests

-------------------------
Estructura básica de un archivo de testeo*/

var expect = require('chai').expect;
describe('Nombre que identifique los testeos', function () {
    it('Testeo 1', function () { });
    it('Testeo 2', function () { });
});

// Dentro de cada estructura it(‘nombre testeo’, function() { }) se debe escribir el código del testeo a realizar.

var expect = require('chai').expect;
describe('Prueba de un velador', function () {
    it('Caso 1: Funcionamiento correcto del velador', function (velador) {
        // Código para probar que un velador funcione
    });
    it('Caso 2: Funcionamiento incorrecto a 110 volts',
        function (velador) {
            // Código para probar que el velador no funciona con 110 volts
        });
});

/* Implementación de un testeo en Mocha con Chai

Luego de instalarlo y crear la carpeta test...

1. Crear el/los archivos de testeo. Por ejemplo test.js (dentro de la carpeta de testeo)

2. Con el editor que utilice abrir el archivo test.js y escribir el código de testeo que deberá ser algo similar a lo siguiente: */

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

/*
3. Editar el archivo package.json y agregar las siguientes líneas para crear un script del testeo y que sea más fácil su ejecución

"scripts": {
 "test": "mocha --exit"
 }

4. Correr el testeo
$ npm test

-------------------------
Nock
Ejemplo para crear un mock de servidor HTTP: */

var nock = require('nock'); // Indica que se utilizará nock
var mockServer = nock('https://www.google.com') // Indica la url del servidor a emular, puede ser cualquiera
    .get('/?q=mercadolibre') // La forma que tendrá la petición
    .query({ q: 'mercadolibre' })
    .reply(200, // respuesta
        {
            results: [
                { title: 'Sitio ML 1' },
                { title: 'Sitio ML 2' }
            ]
        }
    );

/* -------------------------
Testeo de funciones asincrónicas
En los casos que los testeos se deban realizar sobre funciones asincrónicas (que retornan una Promise, por ejemplo), podemos agregar un parámetro (callback) al caso de testeo para indicar que el mismo finalizó y su resultado del mismo */

const chai = require('chai');
const nock = require('nock');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('chai').should();
function funcionAsyncOk() {
    return new Promise((resolve, reject) => {
        resolve('OK');
    })
}
function funcionAsyncConError() {
    return new Promise((resolve, reject) => {
        reject(new Error('No se pudo hacer la operación'));
    })
}
it('Prueba que pasa ok', (done) => {
    funcionAsyncOk().then(rta => {
        done(); // <- Pasa por aquí
    }).catch(e => {
        done(e);
    })
})
it('Prueba que falla', (done) => {
    funcionAsyncConError().then(rta => {
        done();
    }).catch(e => {
        done(e); // <- Pasa por aquí. Al llamar a done con un parámetro estamos indicando que falló la operación
    })
})

/*
El primer testeo, ‘Prueba que pasa ok’ se recibe el parámetro done (callback) el cual es llamado tanto si la función se ejecuta bien, como si la misma se ejecuta con error. En caso de producirse un error (que falle el testeo) a la callback se le pasa un parámetro (el error).

En el .then de la Promise se llama a done() porque la función se ejecutó de la manera esperada.

En el .catch de la Promise se llama a done(e) porque la función no se ejecutó de la manera esperada.
*/