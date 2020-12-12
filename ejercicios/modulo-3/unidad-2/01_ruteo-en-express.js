/* Ruteo en Express:
- Direccionamiento básico
Cómo responde una aplicación a una solicitud del cliente en un determinado punto final?

Tiene 2 componentes básicos:
● una vía de acceso (URI)
● un método de solicitud HTTP específico (GET, POST, etc.)

Estructura de una ruta
    app.METHOD(PATH, HANDLER)
    
app: instancia de express
METHOD: método de solicitud HTTP (GET, POST, etc.)
PATH: vía de acceso al servidor
HANDLER: función que se ejecuta cuando se correlaciona la ruta*/

// Ejemplos
// Responde con Hola! en la página inicial
app.get('/', function (req, res) {
    res.send('Hola!');
});
// responde una solicitud POST
app.post('/', function (req, res) {
    res.send('Hola pedido POST');
});
// direccionamiento all(): no se deriva con ningun método HTTP. Se utiliza para responder a cualquier metodo HTTP
app.all('/productos', function (req, res) {
    console.log('Accediendo a la sección de Productos...');
});
// app.route(): sirve para incluir en un unico lugar los controladores de rutas para una vía
app.route('/book')
    .get(function (req, res) {
        res.send('Elegir un libro al azar');
    })
    .post(function (req, res) {
        res.send('Agregar un libro');
    });

/* Solicitud con parámetros
Se puede hacer de 2 formas:
● http://localhost:3000/usuario/Lorena
● http://localhost:3000/usuario?nombre=Lorena

 Pedido con parámetros
● http://localhost:3000/usuario/Lorena */

app.get('/usuario/:nombre', function (req, res) {
    res.send('Hola'+req.params.nombre);
});

/* Pedido con parámetros 2
http://localhost:3000/usuario?nombre=Lorena */

app.get('/usuario', function (req, res) {
    // llamar con ?nombre=algo
    res.send('Hola'+req.query.nombre);
});