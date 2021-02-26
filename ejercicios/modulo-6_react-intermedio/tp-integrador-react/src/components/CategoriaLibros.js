import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/categoriaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos
import Navbar from './Navbar';

// reducer: default state
// const defaultState = {
//   categoriaLibros: [],
// };

const CategoriaLibros = (props) => {
  // const [state, setState] = useState(props)
  console.log(props.defaultState);
  
  // useReducer
  // const [state, dispatch] = useReducer(reducer, defaultState);

  // buscar lista de categorias en BD
  // useEffect(async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3005/libro');

  //     if (!response.data || response.data?.length == 0) return;
  //     dispatch({ type: 'FETCH_ONE', payload: response.data });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);


  return (
    <>
      <section className='section'>
        <header>
          <h2>Libros en categoria</h2>
          <Navbar />
        </header>

        {/* iterando sobre la lista de libros de la BD */}
        {/* {state.categoriaLibros.map((unLibro) => {
          const {
            id,
            nombre,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;

          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <p>Titulo: {nombre || 'sin libro'}</p>
                <p>Descripción: {descripcion || 'sin descripcion'}</p>
                <p>Categoría: {categoria_id || 'sin categoria'}</p>
                <p>Estatus: {persona_id || 'libro disponible'}</p>
              </div>
            </div>
          );
        })} */}
      </section>
    </>
  );
};

export default CategoriaLibros;
