/* Archivos estáticos

Por ejemplo, imágenes, archivos CSS y archivos JavaScript.
Hay que pasar el nombre de la carpeta que contiene los archivos estáticos con la
siguiente sentencia: */

app.use(express.static('public'));

/* Ahora se pueden cargar los archivos que hay en la carpeta 'carpeta', por ejemplo:

http:localhost:3000/images/kitten.jpg
http:localhost:3000/css/style.css
http:localhost:3000/js/app.js
http:localhost:3000/images/bg.png
http:localhost:3000/hello.html

Express busca los archivos relativos a la carpeta, por lo que el nombre de la carpeta no
forma parte de la URL.

Se pueden incluir varias carpetas con archivos estáticos agregando una sentencia por
cada carpeta:

app.use(express.static('public'));
app.use(express.static('files'));

Siendo así, Express busca los archivos en el orden en el que se definen las carpetas.


=== Prefijo de vía de acceso virtual ===
No existe la vía de acceso realmente.

app.use('/static', express.static('public'));

Entonces ahora puede cargar los archivos que hay en la carpeta public desde el prefijo de vía de acceso /static.

http:localhost:3000/static/images/kitten.jpg
http:localhost:3000/static/css/style.css
http:localhost:3000/static/js/app.js
http:localhost:3000/static/images/bg.png
http:localhost:3000/static/hello.html

La vía de acceso que se proporciona sigue siendo relativa a la carpeta desde donde inicia
el proceso node.

Por eso, si se ejecuta la aplicación desde cualquier otra carpeta, es más seguro utilizar la vía de acceso absoluta de la carpeta a la que se desea dar servicio:
app.use('/static', express.static(__dirname + 'public'));
*/