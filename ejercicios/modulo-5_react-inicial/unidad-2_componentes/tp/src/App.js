import Componente from './componente';

function App() {
  const vector = [
    {
      url: 'https://placeimg.com/80/80/people?id=1',
      title: 'Titulo 1',
      description: 'Descripcion imagen 1'
    },
    {
      url: 'https://placeimg.com/80/80/people?id=2',
      title: 'Titulo 2',
      description: 'Descripcion imagen 2'
    },
    {
      url: 'https://placeimg.com/80/80/people?id=3',
      title: 'Titulo 3',
      description: 'Descripcion imagen 3'
    },
    {
      url: 'https://placeimg.com/80/80/people?id=4',
      title: 'Titulo 4',
      description: 'Descripcion imagen 4'
    }
  ]

  const respuesta = vector.map(item => {
    return <Componente compUrl={item.url} compTitle={item.title} compDescr={item.description} />
  });

  return (
    <div className="App">
      {respuesta}
    </div>
  )
}

export default App;