/* // iniciar un nuevo proyecto// 
1. npm init

// 2. crear el app.js

// 3. instalar los paquetes ( npm install <nombre_paquete>)// Esto crea el package.JSON, package-lock.JSON y node_modules




// Para pasar tu proyecto a alguien// Comprimir todo MENOS node_module// Para usar el proyecto de alguien

// 1. Descomprimir

// 2. npm install  <- esto crea el node_modules

--------------------------

Paso a paso:
- crear carpeta del proyecto
- ingresar a la carpeta desde cmd
- npm init
- desde editor de codigo creap app.js
- desde cmd "npm install"
- npm install --save express
- en app.js:

var express = require('express');
var app = express();

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

---------------------------------------------
AVS 08: Express

- Lo importante: ruteo, envios de emails desde un servidor, archivos estaticos, 

- app ahora es el servidor

- nodemon = demonio. queda ejecutandose para no tener que estar actualizando todo el tiempo la consola.

- este tp era armar un servidor http con express y dar una respuesta al cliente. el protocolo establece una ruta y el metodo.
get
post
put
delete

- armar rutas mas metodo para responder solicitudes. 

app.get('/libro', (req, res) => {
	res.status(200).send('te estoy escuchando');
});

todo metodo sera trabajado con 2 parametros, una es la ruta y la otra es el callback. el callback recibe siempre req y res.

(http.cat estados de la comunicacion)

- cuando pones localhost3000.com/libro automaticamente se manda un get


- para ver esto sin el navegador usar 'postman'. emula el comportamiento de un cliente http

- archivos estaticos:
app.use(express.static(nombre-de-carpeta));

esto genera una ruta localhost/public y va a exponer lo que hay en esa carpeta en dicha url. (en realidad no, sin public va a funcionar)
convierte lo que hay en la carpeta public en la carpeta raiz

- generalmente el desarrollador define las rutas. en general no dejas el archivo estatico en la ruta raiz. generalmente se le da el /static.

app.use('nombre-de-ruta' ,express.static(nombre-de-carpeta)); 

app.use('/static', express.static(public)); 

- segun el metodo la informacion viaja en la url o en el cuerpo del mensaje

app.post('/prueba', (req, res) => {

})

- el req tiene dentro 3 estructuras:
req.params -> get, delete, put
req.query -> get
req.body -> post, put

para recibir en el body hay que establecer como viene la info dentro del cuerpo del mensaje.para eso agregamos 
app.use(express.urlencoded());

    ejemplo body
        req.body = {
            nombre = <dato del nombre>,
            mail = <dato del mail>
        }

        entonces:
        req.body.nombre
        req.body.mail

por get hay dos formas de mandar la info: 

(https://github.com = servidor
/nombre = ruta
/staticsFileNodeJs = variable que referencia a un repo en particular)
en node seria: app.get('/nombre/:nombre-repo(/staticsFileNodeJs)', (req, res) => {

})
el ':repo' dice a express que estas recibiendo nombre de una variable que esta en req.params.repo

la otra forma es la del campus, por ejemplo: 
https://campus.utnba.centrodeelearning.com/course/view.php?id=11999

nombre-servidor+ruta+nombrearchivo y ?id=11999

en el primero se recibe solo la info, en el segundo se recibe la info (id) mas el nombre de la variable. se recibe con clave-valor
en node:
app.get('/ruta', (req, res) => {

})
no se pone nada porque en la url ya viene directamente el nombre de la variable y se almacena en req.query.nombre-que-trae

forma 1 en get
app.get('/libro/:id' (req, res) => {
    res.status(200).send('envio ' + req.params.id);
})

forma 2 en get (cuando viene con signo de interrogacion)
app.get('/libro' (req, res) => {
    res.status(200).send('envio ' + req.query.nombre);
})

*/