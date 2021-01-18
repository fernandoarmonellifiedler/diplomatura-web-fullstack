import PrimerComponente from './primerComponente';
import RenderSinContenedor from './renderSinContenedor';
import AppTareas from './AppTareas'

/*
// 01) componente react utilizando funciones
function App() {
  return (
    <div className="App">
      <PrimerComponente />
      <RenderSinContenedor />
      <PrimerComponente name="Carlos" />
      <PrimerComponente name="Maria" />
      <PrimerComponente name="Gerardo" />
    </div>
  )
}
*/
/*
// 03) uso de vectores
function App() {
  const vectorNombres = [
    'Juan Carlos',
    'Maria',
    'Gerardo'
  ];

  const respuesta = vectorNombres.map(item => {
    return <PrimerComponente name={item} />
  });

  return (
    <div className="App">
      {respuesta}
    </div>
  )
}
*/

// 07) uso de array.forEach
function App() {
  const vectorNombres = [
    'Juan Carlos',
    'Maria',
    'Gerardo'
  ];

  const respuesta = [];

  vectorNombres.forEach(item => {
    respuesta.push(<PrimerComponente name={item} />)
  });

  return (
    <div className="App">
      {respuesta}
    </div>
  )
}

/*
// Propagación de evento al componente padre - NO FUNCIONA EL EJEMPLO DADO
function App() {
  return (
    <div className="App">
      <AppTareas />
    </div>
  )
}
*/

export default App;