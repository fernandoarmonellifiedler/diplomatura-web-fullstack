/* Formas de testear NodeJS

Herramientas de testeo:

1) Mocha
Framework JS de testeo simple y flexible para Node JS.
Es una aplicación que facilita el testeo del sistema. Se “programa” un set de testeos y Mocha ejecutará cada caso automáticamente e informará sobre el resultado de los mismos.

Consideraciones
● Los testeos corren de manera serial (uno luego de otro)
● Incorpora reportes
● Incluye las excepciones no capturadas en el caso de testeo correspondiente
● Reporte de coverage (cobertura)
● Permite correr tests de cumplen una RegExp (Expresión Regular)
● Podemos usar Promises
● Permite la utilización de bibliotecas de assertions como por ejemplo, Chai

Instalación
npm install --save-dev mocha

-------------------------
2) Chai
Es una biblioteca para assertions (indicar los resultados esperados). Las palabras claves son: expect, assert, should

Instalación
npm install --save-dev chai

Una vez instalados ambos paquetes, comenzamos con la forma de trabajar con estas herramientas!

Código de testeo */
var nombre = 'Juan';
var assert = require('chai').assert
var expect = require('chai').expect;
var should = require('chai').should(); // Aquí llamamos a una función
assert.equal(nombre, 'Juan'); // El resultado correcto es que nombre sea Juan
expect(nombre).to.equal('Juan'); // Se espera que nombre sea igual a Juan
nombre.should.equal('Juan'); // El nombre debería ser Juan

/*
Algunas estructura
Al codificar se pueden usar cualquiera de las opciones indicadas (assert, expect, should), a continuación utilizaremos expect pero es sólo una cuestión de gustos.

expect(obj).to.be.a('<tipo de datos>');
expect(obj).to.equal('<valor>');
expect(obj).to.have.length(<longitud>);
expect(obj).to.have.property('<nombre prop>');

Enlaces
Detengámonos en la lectura “fluida” (en inglés) que podemos hacer de cada una de las sentencias anteriore. Esto se logra por los “enlaces” que son palabras sin ningún tipo de funcionalidad pero que son proveídas por las herramientas para facilitar la lectura del código.

Los enlaces disponibles son:
● to
● be
● been
● is
● that
● which
● and
● has
● have
● with
● at
● of
● same

Ejemplo:
expect(obj).to.have.length(<longitud>);

- to.have son 2 enlaces que se utilizan juntos, siempre separados por un punto
(.)

Palabras reservadas con función
Algunas funciones que nos serán de utilidad:

.not()        |  niega la respuesta
.true()       |  espera el valor verdadero
.false()      |  espera el valor falso
.null()       |  espera el valor null
.undefined()  |  espera el valor undefined
.NaN()        |  espera el valor NaN (not a number)
.above(x)     |  espera un valor menor al pasado
.below(x)     |  espera un valor mayor al pasado
.within(x, y) |  espera que el valor esté entre el mínimo y máximo
pasado

-------------------------
3) Nock
Es una biblioteca para realizar mock (simuladores) de peticiones HTTP.
Es de uso muy sencillo y nos permite hacer mock de servidor HTTP remoto.

Instalación
npm --save-dev nock

Sintaxis: 
var nock = require('nock');
var mockServer = nock('<server>').get('<url>')
    .reply(<http status>, <json de respuesta>);
*/