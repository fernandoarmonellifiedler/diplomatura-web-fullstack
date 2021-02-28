// import './App.css';
// import React, { useState, useEffect } from 'react';
import React, { useReducer } from 'react';
import { reducer } from './reducers/appReducer';
import axios from 'axios';
import Persona from './components/Persona';
import Categoria from './components/Categoria';
import Libro from './components/Libro';

function App() {
  return (
    <>
      <div className='container'>
        <h1 className='app-title'>My Books</h1>
        <div className='app'>
          <Categoria />
          <Libro />
          <Persona />
        </div>
      </div>
      
    </>
  );
}

export default App;

// const [state, setState] = useState({
//   categorias: [],
//   libros: [],
//   personas: [],
// })

// useEffect(async () => {
//   try {
//     let response = await axios.get('http://localhost:3005/categoria');
//     if (!response.data || response.data?.length == 0) return;
//     setState({...state, categorias: response.data})
//     response = await axios.get('http://localhost:3005/libro');
//     if (!response.data || response.data?.length == 0) return;
//     setState({...state, libros: response.data})
//     response = await axios.get('http://localhost:3005/persona');
//     if (!response.data || response.data?.length == 0) return;
//     setState({...state, personas: response.data})
//   } catch (e) {
//     console.log(e);
//   }
// }, []);
