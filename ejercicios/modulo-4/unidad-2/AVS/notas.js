/* AVS M4 U2

Sobre el tp:
- APIs: cada API debe tener una documentacion (rutas, lo enviado y lo que se devuelve).
    - Pero no ocurre en todos los trabajos. No se suele documentarlas.

- 

Sobre JWT:
- Como cada comunicación ciente-servidor es unica, para cada cliente "crearemos" un pequeño espacio en el servidor que lo pueda identificar
- una sesion es una identificacion que hace el servidor de cada cliente. ese mecanismo de identificacion envia en la solicitud y respuesta la identificacion del cliente con el que se esta comunicando.

Ejemplo práctico:
- npm init
- instalar dependencias (express, jsonwebtoken)

- al puerto te lo genera el entorno de trabajo. Para que no sea el 3000 y si el que provee el servidor. Creamos la variable port con un ternario */

const port = process.env.port ? process.env.port : 3000;

/* proceso de login:
- establecida la conexion debe generarse un token de identificacion
- IMPORTANTE: obviamente, el proceso de login debe enviarse siempre por metodo POST
- como estamos en login, el usuario debe mandar usuario y contraseña asi que debemos verificar si se mandaron esos datos. */

if (!req.body.user || !req.body.pass) {
    res.send({ error: "No mandaste todos los datos" })
    return;
}

//- verificar si usuario y contraseña son reconocidos...

if (req.body.user == 'fer' && req.body.pass == "123") {

} else {
    res.send({ error: "usuario y/o clave incorrecta" })
}

//... y si esta todo ok se deberá iniciar una sesión y enviarle esa identificación. Para ello debemos generar el token.

if (req.body.user == 'fer' && req.body.pass == "123") {

    const tokenData = {
        nombre: 'lala',
        apellido: 'lele'
    };

    const token = jwt.sign(token, 'Secret', {
        expiresIn: 60 * 60 * 24 // expires in 24 hs
    });

    res.send({ token });

} else {
    res.send({ error: "usuario y/o clave incorrecta" })
}

/*- jwt.sign va a enviar el token (una palabra o frase de identificacion) y el tiempo que dura la sesion
- probamos en postman (recordar que json puro va todo entre comillas a menos que sea numero)
- recibimos: */

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJsYWxhIiwiYXBlbGxpZG8iOiJsZWxlIiwiaWF0IjoxNjA5MDk5MTAwLCJleHAiOjE2MDkxODU1MDB9.a-Py_vEjfelzQsqXtl_mSZajxQ7MjXq0TT7NEJJeQro"
}

/*- este token es el que va a identificar al usuario. Por ejemplo, para un GET tendremos que verificar si reconocemos el token.
- ahora el token se envia en el encabezado del body con un nombre y si no lo encuentra manda un error*/

app.get('/producto', (req, res) => {
    let token = req.headers['authorization'];
    //...
    if (!token) {
        console.log('error');
        return;
    };
});

//- funcionando todo bien, se usa el siguiente codigo para acceder a la informacion enviada en el token (se usa replace para quitar la palabra "Bearer" que viene en el token)

token = token.replace('Bearer', '');

/*- siguiendo, token.verify toma el token con la palabra "Secret" (que creamos para generar el token) para "desarmarlo" y colocar esa info en la callback que devolverá o un error o la info que contiene el token. */

jwt.verify(token, 'Secret', (err, user) => {
    if (err) {
        res.status(401).send({
            error: 'Token inválido'
        })
    } else {
        console.log('Esto es el user ', user)

        res.send({
            message: 'Awwww yeah!'
        })
    }
});

/*probamos en postman:
- nos logueamos
- copiamos el token sin las comillas
- hacemos un GET a /producto
 (aqui me da error:  verificar)

------------------------------
- Se pueden usar middlewares para hacer la gestion del token
------------------------------
Login con base de datos (ejemplo con mongo):
- primero hacer un proceso de registro. Se toma el nombre de usuario y contraseña y se verifican.
- verificar que el usuario exista y no se repita (importante!)
-
(hasta 1:32:00 de clase avs. Ejemplos de registro y encriptacion usando mongodb)
*/