import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { reducer } from './reducers/appReducer';
import Persona from './components/Persona';
import Categoria from './components/Categoria';
import Libro from './components/Libro';
import { defaultState } from './components/defaultState';

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(async () => {
    try {
      const fetchCategorias = await axios.get(
        'http://localhost:3005/categoria'
      );
      if (!fetchCategorias.data || fetchCategorias.data?.length == 0) return;
      const fetchLibros = await axios.get('http://localhost:3005/libro');
      if (!fetchLibros.data || fetchLibros.data?.length == 0) return;
      const fetchPersonas = await axios.get('http://localhost:3005/persona');
      if (!fetchPersonas.data || fetchPersonas.data?.length == 0) return;
      dispatch({ type: 'FETCH_CATEGORIA_LIST', payload: fetchCategorias.data });
      dispatch({ type: 'FETCH_BOOK_LIST', payload: fetchLibros.data });
      dispatch({ type: 'FETCH_PERSONA_LIST', payload: fetchPersonas.data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className='container'>
        <h1 className='app-title'>My Books</h1>
        <div className='app'>
          <Categoria state={state} dispatch={dispatch} />
          <Libro state={state} dispatch={dispatch} />
          <Persona state={state} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}

export default App;
