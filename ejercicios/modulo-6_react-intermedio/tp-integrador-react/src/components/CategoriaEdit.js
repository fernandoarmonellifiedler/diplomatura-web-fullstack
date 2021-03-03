import React, { useState } from 'react';
import axios from 'axios';

// COMPONENTE MODAL PARA EDITAR
const CategoriaEdit = (props) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (
        response.data.find(
          (unaCategoria) =>
            unaCategoria.nombre_categoria == nombre.toUpperCase()
        )
      ) {
        return window.alert('Esa categoria ya existe!');
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (nombre) {
        const editCategoria = {
          nombre_categoria: nombre.toUpperCase(),
        };

        const response = await axios.put(
          'http://localhost:3005/categoria/' + props.catId,
          editCategoria
        );
        if (!response.data || response.data?.length == 0) return;
        props.dispatch({ type: 'CATEGORIA_EDIT_ITEM', payload: editCategoria });
        setNombre('');
        props.handleRender();
        props.handleModalEdit();
      } else {
        window.alert('No puedes ingresar valores en blanco');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className='cat-edit-h3'>Editar categoría</h3>
          <button className='btn cat-edit-btn' onClick={props.handleEdit}>
            X
          </button>
        </header>
        <form className='form cat-modal-form' onSubmit={handleSubmit}>
          {/* Nombre de la categoria */}
          <div className='form-control'>
            <label htmlFor='categoria-nombre'>Nombre: </label>
            <input
              type='text'
              id='categoria-nombre'
              name='categoria-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <button type='submit'>Editar Categoría</button>
        </form>
      </section>
    </>
  );
};

export default CategoriaEdit;
