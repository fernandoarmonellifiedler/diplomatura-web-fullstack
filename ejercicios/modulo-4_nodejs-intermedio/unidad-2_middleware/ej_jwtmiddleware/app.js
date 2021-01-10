const express = require('express');
const bcrypt = require('bcrypt');
const unless = require('express-unless');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());

const auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            throw new Error("No estas logueado");
        };

        token = token.replace('Bearer ', '');

        jwt.verify(token, 'Secret', (err, user) => {
            if (err) {
                throw new Error("Token inválido");
            };
        });

        next();
    }
    catch (e) {
        res.status(403).send({ message: e.message })
    }
};

auth.unless = unless;

app.use(auth.unless({
    path: [
        { url: '/registro', methods: ['POST'] },
        { url: '/login', methods: ['POST'] }
    ]
}));

/* Autenticacion */
// paso 1: registro
app.post('/registro', async (req, res) => {
    try {
        // verifica que se ingresen todos los datos
        if (!req.body.usuario || !req.body.clave || !req.body.email || !req.body.cel) {
            throw new Error("No enviaste los datos necesarios");
        }

        // verifica que el nombre de usuario no exista (consulta a la base de datos)
        // si existe manda error

        // si no existe, encripto la clave
        const claveEncriptada = await bcrypt.hash(req.body.clave, 10);

        // guardar usuario con clave encriptada
        const usuario = {
            usuario: req.body.usuario,
            clave: claveEncriptada,
            email: req.body.email,
            cel: req.body.cel
        };

        res.send({ message: "Se registró correctamente" });
    }

    catch (e) {
        res.status(413).send({ message: e.message })
    }
})


// paso 2: login
app.post('/login', async (req, res) => {
    try {
        // verifica datos obligatorios
        if (!req.body.usuario || !req.body.clave) {
            throw new Error("No enviaste los datos necesarios");
        }

        // a_ encuentra usuario en BD (consulta a la BD)
        const claveEncriptada = "gskagdakj22"; // a modo de ejemplo, esto en realidad viene de la base de datos
        /*
        // b_ verifica la clave
        if (!bcrypt.compareSync(req.body.clave, claveEncriptada)) {
            throw new Error("Falló el login");
        }
*/
        // c_ genera una sesión
        const tokenData = {
            nombre: "Fernando",
            Apellido: "Armonelli Fiedler",
            user_id: 1
        }

        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })

        res.send({ token });

    }

    catch (e) {
        res.status(413).send({ message: e.message })
    }
})

app.get('/libros', (req, res) => {
    try {
        /* reconocimiento del token
        let token = req.headers['authorization'];

        if (!token) {
            throw new Error("No estas logueado");
        };

        token = token.replace('Bearer ', '');

        jwt.verify(token, 'Secret', (err, user) => {
            if (err) {
                throw new Error("Token inválido");
            };
        });*/

        res.send({ message: "lista de libros" })
    }

    catch (e) {
        res.status(413).send({ message: e.message })
    }
})


// server
app.listen(3000, () => console.log("Server listening on port", port));


/* ==================================
App: Servidor para escribir notas y/o comentarios de clientes
-------------------------------------
Notas sobre el video middleware y jwt:
- bibliotecas utilizadas
    express, bcrypt, express-unless, jsonwebtoken

-------------------------------------
- usamos el middleware (app.use) express.json: permite recibir en un obj js los datos enviados por metodo post o put (en el body) y que sea un json.
    - convierte informacion json en un obj javascript
    - el .use permite usar middlewares (basicamente el express es un conjunto de middlewares)

-------------------------------------
- port: en lugar de definirlo vamos a utilizar un ternario para definir un puerto si lo provee el entorno, sino sera 3000

-------------------------------------
Trabajando con un sistema de autenticacion:
- como cada peticion es unica entonces trabajamos con sesiones.
- por un lado tendremos la autenticacion, que es el login
- por el otro, el manejo de sesiones que permite conservar la informacion de esa autenticacion con un reconocimiento

1) registro:
    - se hace a traves de un formulario (post) y luego se validan ciertos datos (si se ingresan todos los datos, si el nombre de usuario ya existe, etc). Para eso se consulta a la base de datos:

    SELECT * FROM usuario WHERE usuario = req.body.usuario; // mysql
    usuario.find({usuario: req.body.usuario}); //mongo

    - se encripta la clave con bcrypt y se guarda el usuario con la clave encriptada.

2) login:
    - se verifica tambien que se hayan enviado los datos obligatorios

    - se busca el usuario en la base de datos

    - se verifica la clave. Se utiliza bcrypt y compare. primer parametro es la clave proporcionada y el segundo, la clave encriptada

    - pasando la verificacion se genera la sesion. Para ello creamos un token con los datos del usuario minimos para reconocimiento del mismo. Este token es el que va a reconocer al usuario desde el servidor

    - jwt.sign toma como primer parametro los datos del usuario y como segundo parametro una palabra clave que servirá para encriptar la información y generar una cadena de caracteres identificatoria

    - finalmente, se envia el token

    * Para que funcione el ejemplo em Postman comentamos la verificacion del POST /login para pasar directamente al send
-------------------------------------
El cliente envía el token de vuelta para verificar su conexión: usaremos el ejemplo de un GET /libros para verificar que el usuario se haya logueado:

    - se toma el token que viene en el req.headers a traves de una 'authorization' y se lo almacena en una variable.
    (para esto, en Postman vamos a headers y creamos una key 'authorization' con el token como value)

    - si no manda nada mandamos un error (no esta logueado/a)

    - se hace un replace sobre el token (string vacía en lugar de "Bearer ")

    - finalmente, se verifica el token con la palabra clave ('Secret' en este caso) para decodificar el token. La callback recibe o el error (el token es inválido) o el usuario (token correcto).

    - sigue el programa. En este caso enviamos solo un mensaje genérico

- para todos los metodos POST, GET, etc primero hay que hacer el reconocimiento.

-------------------------------------
Uso de middlewares
- Para evitar colocar el mismo trecho de código en todos los métodos para verificar el token del usuario usaremos los middlewares.
- Todo el codigo de verificación irá a una funcion externa que será ejecutada antes de cualquier solicitud. Crearemos al comienzo una variable (auth) con una funcion arrow.

código a usar:

    let token = req.headers['authorization'];

    if (!token) {
        throw new Error("No estas logueado");
    };

    token = token.replace('Bearer ', '');

    jwt.verify(token, 'Secret', (err, user) => {
        if (err) {
            throw new Error("Token inválido");
        };
    });

- IMPORTANTE: colocar next() al final del middleware. Le pasará el control a la función que sigue.

- Para ejecutar esta función middleware antes de cada petición (inclusive antes de registro o login) debemos usar app.use(auth());

- para evitar hacerlo en el registro y el login (porque va a dar error) usaremos la biblioteca express-unless. 
    - Aplicamos el unless luego de declarar la funcion
    - modificamos el app.use(auth()) con unless para indicarle cuales path o rutas no usarlo
*/
