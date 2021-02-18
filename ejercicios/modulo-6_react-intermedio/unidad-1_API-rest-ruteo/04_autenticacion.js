/* Autenticación

Rutas seguras
En nuestra aplicación, el usuario solo debe poder acceder al listado de post si él se encuentra logueado en el sistema.
Para ello podemos:
  ● Verificar en el componentDidMount de los componentes que necesiten autenticación
  ● Crear una validación en la ruta


Validación de la ruta */

function checkAuth() {
  var token = store.getState().token;
  if (token) {
    return <ToDo />
  } else {
    return <Redirect to="/login" />
  }
}
// ...

<Provider store={store}>
  <Router>
    <Route exact path="/" render={checkAuth} />
    <Route component={Login} path="/login" />
  </Router>
</Provider>

/* -------------------------------
Headers en axios

- Envíos de encabezados en axios */

var opciones = {
  headers: {
    "Authorization" : "Bearer <token>"
  }
}
axios.get(<url server>, opciones);
