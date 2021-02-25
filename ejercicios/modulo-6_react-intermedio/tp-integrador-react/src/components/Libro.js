import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/libroReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  libros: [],
};

const Libro = () => {
  // state de libro nuevo
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');

  // useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  // buscar lista de libros en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);
  // envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // evita aguegar campos vacios
    if (nombre && descripcion) {
      const nuevoLibro = {
        nombre_libro: nombre,
        descripcion: descripcion,
        categoria_id: categoria,
        persona_id: persona,
      };
      // agregar libro al state
      dispatch({ type: 'ADD_ITEM', payload: nuevoLibro });
      // axios POST
      axios.post('http://localhost:3005/libro', nuevoLibro);
      // borrar campos luego de agregar el item
      setNombre('');
      setDescripcion('');
      setCategoria('');
      setPersona('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  const handleDelete = (e) => {
    const libroId = e.target.value;
    dispatch({ type: 'REMOVE_ITEM', payload: libroId });
    axios.delete('http://localhost:3005/libro/'+libroId);
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
            <label htmlFor='libro-categoria'>Categoria ID: </label>
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
            <label htmlFor='libro-persona'>Prestar a: </label>
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
        {/* iterando sobre la lista de libros de la base de datos */}
        {state.libros.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;
          return (
            <div className='item' key={id || uuidv4()}>
              <h4>{nombre_libro || 'sin libro'}</h4>
              <p>{descripcion || 'sin descripcion'}</p>
              <p>{categoria_id || 'sin categoria'}</p>
              <p>{persona_id || 'libro disponible'}</p>
              <button className='btn'>Editar</button>
              <button className='btn' onClick={handleDelete} value={id}>
                Eliminar
              </button>
              <button className='btn'>prestar / devolver</button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Libro;
