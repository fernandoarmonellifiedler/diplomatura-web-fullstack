/* Testeo de una aplicación Express

Al momento de realizar las pruebas en nuestra aplicación también tenemos la posibilidad de realizar pruebas sobre Express, emulando peticiones del cliente y analizando la respuesta.

Para poder realizar peticiones a la aplicación Express debemos incorporar un nuevo paquete a nuestras dependencias de desarrollo chai-http

npm install --save-dev chai-http

Para poder probar nuestra aplicación, debemos realizar una serie de pasos que a continuación veremos.

1. Modificar nuestra aplicación (en la cual utilizamos Express) para que exporte el servidor */

const server = app.listen(3000, function () {
    console.log('Iniciando la aplicación en http://localhost:3000 ');
});
module.exports = server;

/*
2. Definir los casos de testeo y que en los mismos se utilice el módulo de la aplicación Express. En el ejemplo siguiente el archivo de la aplicación Express tiene como nombre “index.js” y se encuentra en la carpeta ../

Al iniciar el conjunto de casos de testeo se define la variable server con el servidor express que se inicia al realizar el require

Al finalizar los casos de testeo, se detiene el servidor Express */

describe('Conjunto de testeos', () => {
    var server;
    before(function () {
        server = require('../index');
    });
    after(function (done) {
        server.close();
        done();
    });
//...
})

/*
3. Realizar peticiones al servidor Express.
Para ello llamamos a chai.request(server) y le indicamos que tipo de petición deseamos realizar get, post, put, etc.

Luego en la respuesta (res) obtenemos la respuesta de Express, en la cual podemos verificar el status code de la respuesta, el cuerpo (body) o las comprobaciones que deseemos realizar sobre la misma.

it('Obtener pagina principal', (done) => {
    chai.request(server).get('/').end((err, res) => {
        res.should.have.status(200);
        done();
    })
})
*/