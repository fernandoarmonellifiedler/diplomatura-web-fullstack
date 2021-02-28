import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { reducer } from '../reducers/categoriaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  categorias: [],
  librosEnCategoria: [],
  libros: [],
  categoriaModal: false,
  categoriaEditModal: false,
  // cambioEstado: false
};

const Categoria = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [estado, setEstado] = useState(false);
  // useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  const cambiarEstado = () => {
    setEstado((estado) => !estado);
  };

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
      const editCategoria = {
        nombre_categoria: nombre.toUpperCase(),
      };
      dispatch({ type: 'ADD_ITEM', payload: editCategoria });
      axios.post('http://localhost:3005/categoria', editCategoria);
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

  const handleEdit = (e) => {
    const categoriaId = e.target.value;
    if (categoriaId) {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.categoriaEditModal,
      });
      setId(categoriaId);
    } else {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.categoriaEditModal,
      });
    }
  };

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
console.log(state.categoriaEditModal);
  return (
    <>
      {state.categoriaModal && <CategoriaModal fullState={state} handleVerMas={handleVerMas}  />}
      {state.categoriaEditModal && (
        <CategoriaEdit catId={id} cambiarEstado={cambiarEstado} handleEdit={handleEdit} />
      )}

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

const CategoriaEdit = (props) => {
  const [nombre, setNombre] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre) {
      const editCategoria = {
        nombre_categoria: nombre.toUpperCase(),
      };
      dispatch({ type: 'EDIT_ITEM', payload: editCategoria });
      axios.put(
        'http://localhost:3005/categoria/' + props.catId,
        editCategoria
      );
      setNombre('');
      props.cambiarEstado();
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className="cat-edit-h3">Editar categoría</h3>
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

const CategoriaModal = (props) => {
console.log(props);
  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className='cat-modal-h3'>Libros en categoria:</h3>
          <button className='btn cat-modal-btn' onClick={props.handleVerMas}>
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
