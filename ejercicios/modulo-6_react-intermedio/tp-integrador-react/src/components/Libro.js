import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/libroReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  libros: [],
  categorias: [],
  personas: [],
  libroEditModal: false,
  libroPrestarModal: false,
};

// COMPONENTE PRINCIPAL
const Libro = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState); // useReducer
  const [id, setId] = useState('');

  // buscar lista de libros en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // buscar lista de categorias en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_CATEGORIA_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // buscar lista de personas en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/persona');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_PERSONA_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // ADD nuevo libro
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && descripcion) {
      const nuevoLibro = {
        nombre_libro: nombre.toUpperCase(),
        descripcion: descripcion.toUpperCase(),
        categoria_id: categoria,
        persona_id: persona,
      };
      dispatch({ type: 'ADD_ITEM', payload: nuevoLibro });
      axios.post('http://localhost:3005/libro', nuevoLibro);
      setNombre('');
      setDescripcion('');
      setCategoria('');
      setPersona('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  // DELETE libro
  const handleDelete = async (e) => {
    const libroId = e.target.value;
    const response = await axios.delete(
      'http://localhost:3005/libro/' + libroId
    );
    if (!response.data || response.data?.length == 0) return;
    dispatch({ type: 'REMOVE_ITEM', payload: libroId });
    axios.delete('http://localhost:3005/libro/' + libroId);
  };

  // PUT libro
  const handleEdit = (e) => {
    const libroId = e.target.value;
    if (libroId) {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.libroEditModal,
      });
      setId(libroId);
    } else {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.libroEditModal,
      });
    }
  };

  // PUT libro prestar
  const handlePrestar = (e) => {
    const libroId = e.target.value;
    if (libroId) {
      dispatch({
        type: 'SWITCH_PRESTAR_MODAL',
        payload: state.libroPrestarModal,
      });
      setId(libroId);
    } else {
      dispatch({
        type: 'SWITCH_PRESTAR_MODAL',
        payload: state.libroPrestarModal,
      });
    }
  };

  // PUT libro devolver
  const handleDevolver = (e) => {
    const libroId = e.target.value;
    const libroSelected = state.libros.find((unLibro) => unLibro.id == libroId);

    const devolverLibro = {
      nombre_libro: libroSelected.nombre_libro,
      descripcion: libroSelected.descripcion,
      categoria_id: libroSelected.categoria_id,
      persona_id: null,
    };

    dispatch({ type: 'DEVOLVER_ITEM', payload: devolverLibro });
    axios.put('http://localhost:3005/libro/devolver/' + libroId, devolverLibro);
  };

  return (
    <>
      {/* Modal para editar libro */}
      {state.libroEditModal && (
        <LibroEdit
          libroId={id}
          handleEdit={handleEdit}
          listaLibros={state.libros}
        />
      )}
      {/* Modal para prestar libro */}
      {state.libroPrestarModal && (
        <LibroPrestar
          libroId={id}
          handlePrestar={handlePrestar}
          listaLibros={state.libros}
        />
      )}

      <section className='section'>
        <header>
          <h2>Agregar nuevo libro</h2>
        </header>
        {/* Formulario */}
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
        {/* iterando la lista de libros de la bd */}
        <h3>Listado de libros</h3>
        {state.libros.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;
          const categoriaEnUso = state.categorias.filter(
            (unaCategoria) => categoria_id == unaCategoria.id
          );

          const NombrePersona = state.personas.filter(
            (unaPersona) => persona_id == unaPersona.id
          );

          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <p>Titulo: {nombre_libro || 'sin libro'}</p>
                <p>Descripción: {descripcion || 'sin descripcion'}</p>
                <p>
                  {categoriaEnUso.length !== 0
                    ? 'Categoria: ' +
                      categoriaEnUso.map(
                        (unaCategoria) => unaCategoria.nombre_categoria
                      )
                    : 'sin categoria'}
                </p>
                <p>
                  {NombrePersona.length !== 0
                    ? 'Prestado a: ' +
                      NombrePersona.map((unaPersona) => unaPersona.alias)
                    : 'Libro disponible'}

                  {persona_id != null && (
                    <button
                      value={id}
                      onClick={handleDevolver}
                      className='btn item-button-devolver'
                    >
                      devolver libro
                    </button>
                  )}
                </p>
              </div>
              <div className='item-botones'>
                <button className='btn' onClick={handleEdit} value={id}>
                  Editar
                </button>
                <button className='btn' onClick={handlePrestar} value={id}>
                  prestar
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
const LibroEdit = (props) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const libroSelected = props.listaLibros.find(
    (unLibro) => unLibro.id == props.libroId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descripcion) {
      const editLibro = {
        nombre_libro: libroSelected.nombre_libro,
        descripcion: descripcion,
        categoria_id: libroSelected.categoria_id,
        persona_id: libroSelected.persona_id,
      };
      console.log(editLibro);
      dispatch({ type: 'EDIT_ITEM', payload: editLibro });
      axios.put('http://localhost:3005/libro/' + props.libroId, editLibro);
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
      <section className='cat-modal'>
        <header>
          <h3 className='cat-edit-h3'>Editar libro</h3>
          <button className='btn cat-edit-btn' onClick={props.handleEdit}>
            X
          </button>
        </header>
        <form className='form cat-modal-form' onSubmit={handleSubmit}>
          <p>Solo puedes editar su descripción</p>
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
          <button type='submit'>Editar Libro</button>
        </form>
      </section>
    </>
  );
};

// COMPONENTE MODAL PARA PRESTAR/DEVOLVER
const LibroPrestar = (props) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const libroSelected = props.listaLibros.find(
    (unLibro) => unLibro.id == props.libroId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persona) {
      const editLibro = {
        nombre_libro: libroSelected.nombre_libro,
        descripcion: libroSelected.descripcion,
        categoria_id: libroSelected.categoria_id,
        persona_id: persona,
      };

      dispatch({ type: 'PRESTAR_ITEM', payload: editLibro });
      axios.put(
        'http://localhost:3005/libro/prestar/' + props.libroId,
        editLibro
      );
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
      <section className='cat-modal'>
        <header>
          <h3 className='cat-edit-h3'>Editar libro</h3>
          <button className='btn cat-edit-btn' onClick={props.handlePrestar}>
            X
          </button>
        </header>
        <form className='form cat-modal-form' onSubmit={handleSubmit}>
          {/* Persona */}
          <p>Ingresar el Id de la persona a prestar:</p>
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
          <button type='submit'>Prestar Libro</button>
        </form>
      </section>
    </>
  );
};

export default Libro;
