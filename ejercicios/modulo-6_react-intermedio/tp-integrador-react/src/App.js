import './App.css';
import Persona from './components/Persona';
import Categoria from './components/Categoria';
import Libro from './components/Libro';

function App() {
  return (
    <div className='App'>
      <h1>My Books</h1>
      <Persona />
      <Categoria />
      <Libro />
    </div>
  );
}

export default App;
