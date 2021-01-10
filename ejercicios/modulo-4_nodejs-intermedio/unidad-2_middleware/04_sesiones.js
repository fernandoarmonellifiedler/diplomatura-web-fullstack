/* Concepto de sesiones

Una sesión, del latín sessio, es un período temporal ocupado por una cierta actividad.

En el ámbito de la informática, se conoce como sesión a la duración de una conexión a un
determinado sistema o red. La sesión suele incluir el intercambio de paquetes de
información entre un cliente y un servidor. La sesión suele iniciarse luego de que el
usuario se loguea al sistema.

Un token de sesión es un identificador único que está generado y enviado desde un
servidor a un cliente para identificar la sesión de interacción actual. El cliente envía una
cookie HTTP y/o lo envía como parámetro en GET o POST.

HTTP es un protocolo sin estado. Cada petición es completamente independiente de otra
y no hay forma de compartir información entre las peticiones. El objetivo de definir una
sesión es poder almacenar información que sobrevive las peticiones HTTP de un
visitante.

La información de la sesión es un objeto de JS que se puede almacenar en el cliente
(dentro de una cookie) o en el servidor en una base de datos o la memoria.

Web docs:

    Client        Server
    browser

      | --- GET doc --> |
no    |  <--- doc ---   | no
state |                 | state
kept  | --- GET doc --- | kept
      |  <--- doc ---   |
      |                 |

--------------------------------
Cómo trabajan las sesiones

    Client                                      Server

      |           --- authenticate -->             |
      |            <--- response ---               | Response
      |                                            | cookie: session='abc'
      |                                            |
      | --- GET /profile, cockie: sesion='abc' --> | Session
      |            <--- response ---               | matches?
      |                                            |

Consideraciones
● Todos los datos se guardan en el servidor (esto se llama session)
● Podemos agregar información a una session, borrar, modificar, o eliminar la
session (logout)
● Podemos asignar información al usuario y consultarla o modificarla de cualquier
página de nuestro sitio

--------------------------------
Circuito de varias llamadas

Web Browser |                           | Web Server
            | --- User1, Request 1 -->  |    1
    3       | <-- User1, Response 1 --- |    2
            |                           |
    4       | --- User1, Request 2 -->  |    5
            |                           |

Explanation:
1) session_start() creates a new session & ID. Example: S1.
We may put some data in session: $_SESSION['user'] = "Ali"

2) Server put Set-Cookie Header in HTTP Response:
Set-Cookie : PHPSESSID=S1

3) Browser stores PHPSESSID=S1 in cookies

4) Browser put Cookie: PHPSESSID=S1 in HTTP Request, when user send a new request

5) session_start() find PHPSESSID cookie in request and loads data stored in S1 into $_SESSION array.
echo $_SESSION['user']; // Ali

--------------------------------
Sesiones en NodeJS con Express

- Requiere la instalación de un módulo: 

npm install --save express-session

- Incorporación en Express: */

var session = require('express-session')
app.use(session({
      secret: '<algún texto secreto>', cookie: {
            maxAge:
                  60000
      }
}))

//- Se crea la variable de sesion

app.get('/crear', function (req, res) {
      req.session.contador = 0;
      res.send(req.session.contador);
})

//- Uso de req.session.contador

app.get('/incrementar', function (req, res) {
      res.session.contador++;
      res.send(req.session.contador);
});