import React, { useState, useEffect, useReducer } from 'react';
import { reducer } from '../reducers/categoriaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

const CategoriaModal = ({props}) => {

  return (
    <>
      <section className='cat-modal'>
        <header>
          <h2>Libros en categoria:</h2>
          {/* <button className='btn' onClick={handleClick}>
            Cerrar
          </button> */}
        </header>

        {/* iterando sobre la lista de libros de la BD */}
        {props.categoriaLibros.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;

          return (
            <div className='item cat-modal-item' key={id || uuidv4()}>
              <div className='item-datos'>
                <p>Titulo: {nombre_libro || 'sin nombre'}</p>
                <p>Descripción: {descripcion || 'sin descripcion'}</p>
                <p>Categoría: {categoria_id || 'sin categoria'}</p>
                <p>Estatus: {persona_id || 'libro disponible'}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default CategoriaModal;
