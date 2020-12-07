/* Recepción de formularios
Para poder recibir información desde formularios en Express, es necesario incluir el
middleware:
app.use(express.urlencoded());

El método POST es utilizado para recibir la información que el usuario ingresó en un
formulario. En el caso del ejemplo que sigue, el formulario es:

<!DOCTYPE html>
<html>
    <head>
        <title>Formulario</title>
    </head>
    <body>
        <h1>Formulario</h1>
        <form method="POST" action = "/form">
            <input type = "text" name = "nombre" placeholder = "Nombre"><br/>
            <input type = "text" name = "apellido" placeholder = "Apellido"><br/>
            <input type = "text" name = "mensaje" placeholder = "Mensaje"><br/>
            <input type = "submit" value="Enviar">
        </form>
    </body>
</html>

Se recibe la información del formulario por método POST, es decir, que viaja en el cuerpo
del mensaje (body) el nombre y contenido de cada campo del formulario.
En action se indica a dónde enviar la información del formulario una vez que el usuario oprime el botón. En este caso, se trata de una ruta del mismo servidor. La ruta es “/form”.

Ya en el servidor, la información del formulario se recibe en la variable req y como fue mediante método POST, se encuentra en el cuerpo (body) de la variable req.
En la variable res colocamos el mensaje que el servidor retorna al cliente. En este
ejemplo, mediante el método send, se le envía al cliente (el browser), una cadena (string). */

app.post('/form', function (req, res) {
    res.send("Hola " + req.body.nombre + " " + req.body.apellido + " tu mensaje es: " +
        req.body.mensaje);
});

// ---------------------------------

/* Otras formas de devolver información al cliente

Caso 1
En este caso, enviamos como respuesta también un string pero que contiene código HTML el que será interpretado por el navegador.
Se incluye contenido “dinámico” en el html ya que se agrega el nombre y el mensaje que fueron enviados desde el formulario.*/

app.post('/form', function (req, res) {

    var html = "<html><head><title>Hola</title></head><body><h1>Hola " + req.body.nombre + " </h1><br/><p>Tu mensaje fue: " + req.body.mensaje + "</p></body><html>";

    es.send(html);
});

/* Caso 2
Incorporamos otro método: sendFile para enviar un archivo. En este caso, el archivo es un
html sencillo que no puede incluir contenido dinámico.*/

app.post('/form', function (req, res) {
    res.sendFile('paginas/hola.html', { root: __dirname });
}); 