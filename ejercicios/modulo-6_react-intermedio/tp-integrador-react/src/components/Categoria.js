import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/categoriaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  categorias: [],
};

const Categoria = () => {
  const [nombre, setNombre] = useState('');

  // useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  // buscar lista de categorias en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');

      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);
  
  // envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // evita aguegar campos vacios
    if (nombre) {
      const nuevaCategoria = {
        nombre_categoria: nombre.toUpperCase(),
      };
      // agregar categoria al state
      dispatch({ type: 'ADD_ITEM', payload: nuevaCategoria });
      // axios POST
      axios.post('http://localhost:3005/categoria', nuevaCategoria);
      // borrar campos luego de agregar el item
      setNombre('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  const handleDelete = (e) => {
    const categoriaId = e.target.value;
    dispatch({ type: 'REMOVE_ITEM', payload: categoriaId });
    axios.delete('http://localhost:3005/categoria/' + categoriaId);
  };

  const handleEdit = (e) => {
    
    
  };

  const handleVerMas = async (e) => {
    try {
      const categoriaId = e.target.value;
      // const response = await axios.get('http://localhost:3005/categoria/'+categoriaId);
      // console.log(response.data.length);
      // if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_ONE', payload: categoriaId });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
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
