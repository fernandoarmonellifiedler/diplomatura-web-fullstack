import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/categoriaReducer'; // import categoria reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  categorias: [],
  librosEnCategoria: [],
  libros: [],
  categoriaLibrosModal: false,
  categoriaEditModal: false,
};

// COMPONENTE PRINCIPAL
const Categoria = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [count, setCount] = useState(0); // resolver: estado para actualizar el componente
  const [state, dispatch] = useReducer(reducer, defaultState); // useReducer

  // funcion para re-renderizar componentes
  const handleRender = async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  // funcion para abrir/cerrar el modal
  const handleModalEdit = () => {
    dispatch({
      type: 'SWITCH_EDIT_MODAL',
      payload: state.categoriaEditModal,
    });
  };

  // funcion para abrir/cerrar el modal
  const handleModalVerMas = () => {
    dispatch({ type: 'SWITCH_MODAL', payload: state.categoriaLibrosModal });
  };

  // busca lista de categorias en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // ADD nueva categoria
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nombre) {
        const addCategoria = {
          nombre_categoria: nombre.toUpperCase(),
        };
        const response = await axios.post(
          'http://localhost:3005/categoria',
          addCategoria
        );
        if (!response.data || response.data?.length == 0) return;
        dispatch({ type: 'ADD_ITEM', payload: addCategoria });
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
      const categoriaId = e.target.value;
      const response = await axios.delete(
        'http://localhost:3005/categoria/' + categoriaId
      );
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'REMOVE_ITEM', payload: categoriaId });
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
        dispatch({ type: 'FETCH_BOOK_LIST', payload: response.data });
        dispatch({ type: 'FETCH_ONE', payload: categoriaId });
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
      {state.categoriaLibrosModal && (
        <CategoriaLibrosModal fullState={state} handleVerMas={handleVerMas} />
      )}
      {/* Modal para editar categoria */}
      {state.categoriaEditModal && (
        <CategoriaEdit
          catId={id}
          handleEdit={handleEdit}
          handleRender={handleRender}
          handleModalEdit={handleModalEdit}
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
        {state.categorias.map((unaCategoria) => {
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

// COMPONENTE MODAL PARA EDITAR
const CategoriaEdit = (props) => {
  const [nombre, setNombre] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        dispatch({ type: 'EDIT_ITEM', payload: editCategoria });
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

// COMPONENTE MODAL PARA MOSTRAR LIBROS EN CATEGORIA
const CategoriaLibrosModal = (props) => {
  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className='cat-modal-h3'>Libros en categoria:</h3>
          <button
            className='btn cat-modal-btn'
            onClick={props.handleVerMas}
          >
            X
          </button>
        </header>

        {/* iterando sobre la lista de libros de la BD */}
        {props.fullState.librosEnCategoria.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;

          return (
            <div className='item cat-modal-item' key={id}>
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

export default Categoria;
