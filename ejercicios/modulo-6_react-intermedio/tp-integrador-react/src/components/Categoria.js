import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { reducer } from '../reducers/categoriaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos
import CategoriaModal from './CategoriaModal';

// reducer: default state
const defaultState = {
  categorias: [],
  librosEnCategoria: [],
  libros: [],
  categoriaModal: false,
};

const Categoria = () => {
  const [nombre, setNombre] = useState('');
  // useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');

      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre) {
      const nuevaCategoria = {
        nombre_categoria: nombre.toUpperCase(),
      };
      dispatch({ type: 'ADD_ITEM', payload: nuevaCategoria });
      axios.post('http://localhost:3005/categoria', nuevaCategoria);
      setNombre('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  const handleDelete = async (e) => {
    try {
      const categoriaId = e.target.value;
      const response = await axios.delete(
        'http://localhost:3005/categoria/' + categoriaId
      );
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'REMOVE_ITEM', payload: categoriaId });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = (e) => {};

  const handleVerMas = async (e) => {
    const categoriaId = e.target.value;
    if (categoriaId) {
      dispatch({ type: 'SWITCH_MODAL', payload: state.categoriaModal });
      try {
        const response = await axios.get('http://localhost:3005/libro');
        if (!response.data || response.data?.length == 0) return;
        dispatch({ type: 'FETCH_BOOK_LIST', payload: response.data });
        dispatch({ type: 'FETCH_ONE', payload: categoriaId });
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch({ type: 'SWITCH_MODAL', payload: state.categoriaModal });
    }
  };

  return (
    <>
      {state.categoriaModal && <CategoriaModal fullState={state} />}

      <section className='section'>
        <header>
          <h2>Agregar categoría</h2>
        </header>

        <form className='form' onSubmit={handleSubmit}>
          {/* Nombre de la categoria */}
          <div className='form-control categoria-form'>
            <label htmlFor='categoria-nombre'>Nombre: </label>
            <input
              type='text'
              id='categoria-nombre'
              name='categoria-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <button type='submit'>Agregar Categoría</button>
        </form>

        <h3>Listado de categorías</h3>
        {/* iterando sobre la lista de libros de la base de datos */}
        {state.categorias.map((unaCategoria) => {
          const { id, nombre_categoria } = unaCategoria;
          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <h5 className='title-categoria'>
                  {nombre_categoria || 'sin categoria'}
                </h5>
                <p>Categoria N°{id}</p>
                <button onClick={handleVerMas} value={id}>
                  Ver Libros
                </button>
              </div>
              <div className='item-botones'>
                <button className='btn' onClick={handleEdit} value={id}>
                  Editar
                </button>
                <button className='btn' onClick={handleDelete} value={id}>
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};



export default Categoria;
