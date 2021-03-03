import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // genera id unicos
import CategoriaLibrosModal from '../components/CategoriaLibrosModal.js';
import CategoriaEdit from '../components/CategoriaEdit';

// COMPONENTE PRINCIPAL
const Categoria = (props) => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');

  // funcion para re-renderizar componentes
  const handleRender = async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (!response.data || response.data?.length == 0) return;
      props.dispatch({ type: 'FETCH_CATEGORIA_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  // funcion para abrir/cerrar el modal
  const handleModalEdit = () => {
    props.dispatch({
      type: 'SWITCH_CATEGORIA_EDIT_MODAL',
      payload: props.state.categoriaEditModal,
    });
  };

  // funcion para abrir/cerrar el modal
  const handleModalVerMas = () => {
    props.dispatch({
      type: 'SWITCH_CATEGORIA_MODAL',
      payload: props.state.categoriaLibrosModal,
    });
  };

  // ADD nueva categoria
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        props.state.categorias.find(
          (unaCategoria) =>
            unaCategoria.nombre_categoria == nombre.toUpperCase()
        )
      ) {
        return window.alert('Esa categoria ya existe!');
      }
      if (nombre) {
        const addCategoria = {
          nombre_categoria: nombre.toUpperCase(),
        };
        const response = await axios.post(
          'http://localhost:3005/categoria',
          addCategoria
        );
        if (!response.data || response.data?.length == 0) return;
        props.dispatch({ type: 'CATEGORIA_ADD_ITEM', payload: addCategoria });
        setNombre('');
        handleRender();
      } else {
        window.alert('No puedes ingresar valores en blanco');
      }
    } catch (e) {
      console.log(e);
    }
  };
  // DELETE categoria
  const handleDelete = async (e) => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (
        response.data.find((unLibro) => unLibro.categoria_id == e.target.value)
      ) {
        return window.alert('Esa categoria aun tiene libros asociados!');
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const categoriaId = e.target.value;
      const response = await axios.delete(
        'http://localhost:3005/categoria/' + categoriaId
      );
      if (!response.data || response.data?.length == 0) return;
      props.dispatch({ type: 'CATEGORIA_REMOVE_ITEM', payload: categoriaId });
      handleRender();
    } catch (e) {
      console.log(e);
    }
  };
  // PUT categoria
  const handleEdit = (e) => {
    const categoriaId = e.target.value;
    if (categoriaId) {
      handleModalEdit();
      setId(categoriaId);
    } else {
      handleModalEdit();
    }
  };
  // Modal para ver libros en categoria
  const handleVerMas = async (e) => {
    const categoriaId = e.target.value;
    if (categoriaId) {
      handleModalVerMas();
      try {
        const response = await axios.get('http://localhost:3005/libro');
        if (!response.data || response.data?.length == 0) return;
        props.dispatch({ type: 'FETCH_BOOK_LIST', payload: response.data });
        props.dispatch({
          type: 'FETCH_BOOKS_ON_CATEGORY',
          payload: categoriaId,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      handleModalVerMas();
    }
  };

  return (
    <>
      {/* Modal para ver libros en categoria */}
      {props.state.categoriaLibrosModal && (
        <CategoriaLibrosModal
          state={props.state}
          handleVerMas={handleVerMas}
          dispatch={props.dispatch}
        />
      )}
      {/* Modal para editar categoria */}
      {props.state.categoriaEditModal && (
        <CategoriaEdit
          catId={id}
          handleEdit={handleEdit}
          handleRender={handleRender}
          handleModalEdit={handleModalEdit}
          state={props.state}
          dispatch={props.dispatch}
        />
      )}
      <section className='section'>
        <header>
          <h2>Agregar categoría</h2>
        </header>
        {/* Formulario */}
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

        {/* iterando sobre la lista de categorias de la bd */}
        <h3>Listado de categorías</h3>
        {props.state.categorias.map((unaCategoria) => {
          const { id, nombre_categoria } = unaCategoria;
          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <h5 className='title-categoria'>
                  {nombre_categoria || 'sin categoria'}
                </h5>
                <p>Categoria Id: {id}</p>
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
