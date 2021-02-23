import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

// uuid module (generador de id unicos para cada libro)
// import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// useReducer
const reducer = (state, action) => {
  if (action.type === 'FETCH LIST') {
    const nuevoLibros = action.payload;
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  throw new Error('no matching action type');
};
const defaultState = {
  libros: [],
};

const Libro = () => {
  // nombre y descripcion de libro nuevo
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');

  // reducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH LIST', payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && descripcion) {
      const nuevoLibro = {
        id: new Date().getTime().toString(),
        nombre,
        descripcion,
        categoria,
        persona,
      };
      console.log(nuevoLibro);
      dispatch({ type: 'ADD_ITEM', payload: nuevoLibro });

      // falta comando en axios para agregar el libro nuevo a la base de datos MySQL
      setNombre('');
      setDescripcion('');
      setCategoria('');
      setPersona('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  return (
    <>
      <section className='section'>
        <header>
          <h2>Agregar nuevo libro</h2>
        </header>

        <form className='form' onSubmit={handleSubmit}>
          {/* Nombre del Libro */}
          <div className='form-control'>
            <label htmlFor='libro-nombre'>Nombre: </label>
            <input
              type='text'
              id='libro-nombre'
              name='libro-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* Descripcion */}
          <div className='form-control'>
            <label htmlFor='libro-descripcion'>Descripción: </label>
            <input
              type='text'
              id='libro-descripcion'
              name='libro-descripcion'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          {/* Categoria */}
          <div className='form-control'>
            <label htmlFor='libro-categoria'>Categoria: </label>
            <input
              type='text'
              id='libro-categoria'
              name='libro-categoria'
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          {/* Persona */}
          <div className='form-control'>
            <label htmlFor='libro-persona'>Persona: </label>
            <input
              type='text'
              id='libro-persona'
              name='libro-persona'
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            />
          </div>
          <button type='submit'>Agregar Libro</button>
        </form>

        <h2>Listado de libros</h2>
        {state.libros.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;
          return (
            <div className='item' key={id}>
              <h4>{nombre_libro || 'sin libro'}</h4>
              <p>{descripcion || 'sin descripcion'}</p>
              <p>{categoria_id || 'sin categoria'}</p>
              <p>{persona_id || 'libro disponible'}</p>
              <button className='btn'>Editar</button>
              <button className='btn'>Eliminar</button>
              <button className='btn'>prestar / devolver</button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Libro;
