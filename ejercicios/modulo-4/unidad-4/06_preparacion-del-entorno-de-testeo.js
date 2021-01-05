/* Preparación del entorno de testeo y liberación

Cuando estamos creando los casos de testeo, es posible que necesitemos preparar el entorno antes de realizar cada prueba. Podemos crear datos necesarios, conexiones, configuraciones, etc. 

Todo este código podemos agruparlo dentro de una función especial
“before” la cual recibe como parámetro la función que debe ejecutarse antes de iniciar el conjunto de casos de testeo.

También podemos ejecutar código antes de iniciar cada caso de testeo en particular, para este caso tenemos la función “beforeEach”. Veamos un ejemplo de cómo podemos usar ambas. */

const chai = require('chai');
const assert = chai.assert;
describe('Casos de testeo', () => {
    before(() => {
        console.log('Al iniciar casos de testeo')
    })
    beforeEach(() => {
        console.log('Antes de cada caso de testeo')
    })
    it('Caso 1', () => {
        assert(true, 'True es true');
    })
    it('Caso 2', () => {
        assert(true, 'True es true');
    })
    it('Caso 3', () => {
        assert(true, 'True es true');
    })
})

/* Y la correspondiente salida por consola de la ejecución de las pruebas.

Casos de testeo
Al iniciar casos de testeo
Antes de cada caso de testeo
    Caso 1
Antes de cada caso de testeo
    Caso 2
Antes de cada caso de testeo
    Caso 3

    3 passing (10ms)

-------------------------
Como podemos apreciar:

● El código de la función before() es llamado una única vez para este conjunto de casos de testeo
● El código de la función beforeEach() es llamado antes de iniciar cada caso de testeo

Al igual que disponemos de funciones que se ejecutan antes de los casos de testeo, tenemos la posibilidad de ejecutar funciones luego de la ejecución de cada caso de testeo, o del conjunto de casos de testeo.

Veamos el ejemplo anterior, ampliado para estos casos */

const chai = require('chai');
const assert = chai.assert;
describe('Casos de testeo', () => {
    before(() => {
        console.log('Al iniciar casos de testeo')
    })
    beforeEach(() => {
        console.log('Antes de cada caso de testeo')
    })
    after(() => {
        console.log('Ejecutado al final de todos los testeos')
    })
    afterEach(() => {
        console.log('Ejecutado al finalizar cada caso')
    })
    it('Caso 1', () => {
        assert(true, 'True es true');
    })
    it('Caso 2', () => {
        assert(true, 'True es true');
    })
    it('Caso 3', () => {
        assert(true, 'True es true');
    })
})

/* Y la correspondiente salida por pantalla al ejecutar este nuevo caso de testeo.

Casos de testeo
Al iniciar casos de testeo
Antes de cada caso de testeo
    Caso 1
Ejecutando al finalizar cada caso
Antes de cada caso de testeo
    Caso 2
Ejecutando al finalizar cada caso
Antes de cada caso de testeo
    Caso 3
Ejecutando al finalizar cada caso
Ejecutando al finalizar todos los testeos

    3 passing (10ms)

Las funciones before() y beforeEach() son útiles para inicializar datos necesarios por todos los testeos del conjunto. Mientras que las funciones after() y afterEach() son útiles para liberar los datos o recursos que hayamos utilizado en nuestros testeos.

Algunos ejemplos en los cuales podemos usar estas funciones son:

● Conexión/desconexión con una base de datos
● Inicialización/borrado de datos en una base de datos
● Asignación/liberación de recursos
*/