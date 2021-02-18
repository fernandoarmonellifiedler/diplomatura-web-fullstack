/* Ruteo en React
- Permite “enlazar” URLs a componentes
- Las URLs no son pedidas al servidor


----------------------------------
Instalación
Para poder utilizar el ruteo, debemos instalar el componente react-router y react-router-dom

npm install --save react-router react-router-dom


----------------------------------
Uso

import {BrowserRouter as Router, Route} from react-router-dom
// ...
<Router>
  <Route exact path="/" component={App} />
  <Route path="/" component={AppDos} />
  <Route path="/" component={AppTres} />
</Router>

----------------------------------
Redux + Ruteo
Podemos incorporar Redux al ruteo.
En el index.js */

<Provider store={store}>
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/todo" component={ToDo} />
  </Router>
</Provider>


/* -------------------------------
Redirección desde el código

irAPaginaTodo() {
  this.props.history.push('/todo')
}

No hace falta hacer un map del estado history */