import './App.css';
import Persona from './components/Persona';
import Generos from './components/Generos';
import Libro from './components/Libro';

function App() {
  return (
    <div className='App'>
      <h1>My Books</h1>
      {/* <Persona />
      <Generos /> */}
      <Libro />
    </div>
  );
}

export default App;
