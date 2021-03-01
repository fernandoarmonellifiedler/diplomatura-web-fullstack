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

  // funcion para re-renderizar componentes
  const handleRender = async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
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
      payload: state.libroEditModal,
    });
  };

  // funcion para abrir/cerrar el modal
  const handleModalPrestar = () => {
    dispatch({
      type: 'SWITCH_PRESTAR_MODAL',
      payload: state.libroPrestarModal,
    });
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // valida que exista la categoria
    try {
      const response = await axios.get('http://localhost:3005/categoria');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_CATEGORIA_LIST', payload: response.data });
      const result = response.data.filter(
        (unaCategoria) => unaCategoria.id == categoria
      );
      if (result.length == 0) {
        return window.alert('Esa categoria no existe');
      }
    } catch (e) {
      console.log(e);
    }
    // valida que exista la persona
    try {
      const response = await axios.get('http://localhost:3005/persona');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_PERSONA_LIST', payload: response.data });
      const result = response.data.filter(
        (unaPersona) => unaPersona.id == persona 
      );
      if (result.length == 0 && persona != '') {
        return window.alert('Esa persona no existe');
      }

    } catch (e) {
      console.log(e);
    }

    try {
      if (nombre && descripcion) {
        const nuevoLibro = {
          nombre_libro: nombre.toUpperCase(),
          descripcion: descripcion.toUpperCase(),
          categoria_id: categoria,
          persona_id: persona || null,
        };

        // valida que el nombre no exista
        const result = state.libros.filter(
          (unLibro) => unLibro.nombre_libro == nuevoLibro.nombre_libro 
        );
        if (result.length != 0) {
          return window.alert('Esa libro ya existe');
        }

        const response = await axios.post(
          'http://localhost:3005/libro',
          nuevoLibro
        );
        if (!response.data || response.data?.length == 0) return;
        dispatch({ type: 'ADD_ITEM', payload: nuevoLibro });
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setPersona('');
        handleRender();
      } else {
        window.alert('No puedes ingresar valores en blanco');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE libro
  const handleDelete = async (e) => {
    const libroId = e.target.value;
    try {
      const unLibro = state.libros.find(unLibro => unLibro.id == libroId)
    const result = state.personas.find(unaPersona => unaPersona.id == unLibro.persona_id)
    if (result) {
      return window.alert('Debes devolver el libro para poder borrarlo')
    }
      const response = await axios.delete(
        'http://localhost:3005/libro/' + libroId
      );
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'REMOVE_ITEM', payload: libroId });
      handleRender();
    } catch (e) {
      console.log(e);
    }
  };

  // PUT libro
  const handleEdit = (e) => {
    const libroId = e.target.value;
    if (libroId) {
      handleModalEdit();
      setId(libroId);
    } else {
      handleModalEdit();
    }
  };

  // PUT libro prestar
  const handlePrestar = (e) => {
    const libroId = e.target.value;
    if (libroId) {
      handleModalPrestar();
      setId(libroId);
    } else {
      handleModalPrestar();
    }
  };

  // PUT libro devolver
  const handleDevolver = async (e) => {
    const libroId = e.target.value;
    const libroSelected = state.libros.find((unLibro) => unLibro.id == libroId);

    const devolverLibro = {
      nombre_libro: libroSelected.nombre_libro,
      descripcion: libroSelected.descripcion,
      categoria_id: libroSelected.categoria_id,
      persona_id: null,
    };
    try {
      const response = await axios.put(
        'http://localhost:3005/libro/devolver/' + libroId,
        devolverLibro
      );
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'REMOVE_ITEM', payload: libroId });
      dispatch({ type: 'DEVOLVER_ITEM', payload: response.data });
      handleRender();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* Modal para editar libro */}
      {state.libroEditModal && (
        <LibroEdit
          libroId={id}
          handleEdit={handleEdit}
          listaLibros={state.libros}
          handleRender={handleRender}
          handleModalEdit={handleModalEdit}
        />
      )}
      {/* Modal para prestar libro */}
      {state.libroPrestarModal && (
        <LibroPrestar
          libroId={id}
          handlePrestar={handlePrestar}
          listaLibros={state.libros}
          handleRender={handleRender}
          handleModalPrestar={handleModalPrestar}
          listaPersonas={state.personas}
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editLibro = {
        nombre_libro: libroSelected.nombre_libro,
        descripcion: descripcion,
        categoria_id: libroSelected.categoria_id,
        persona_id: libroSelected.persona_id,
      };
      if (descripcion) {
        const response = await axios.put(
          'http://localhost:3005/libro/' + props.libroId,
          editLibro
        );
        if (!response.data || response.data?.length == 0) return;
        dispatch({ type: 'EDIT_ITEM', payload: response.data });
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setPersona('');
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

// COMPONENTE MODAL PARA PRESTAR
const LibroPrestar = (props) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [persona, setPersona] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const libroSelected = props.listaLibros.find(
    (unLibro) => unLibro.id == props.libroId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (persona) {
        const editLibro = {
          nombre_libro: libroSelected.nombre_libro,
          descripcion: libroSelected.descripcion,
          categoria_id: libroSelected.categoria_id,
          persona_id: persona,
        };

        const unaPersona = props.listaPersonas.find(unaPersona => unaPersona.id == persona)
        if (!unaPersona) {
          return window.alert('Ese Id de persona no existe')
        }

        const libroStatus = props.listaLibros.find(unLibro => unLibro.persona_id != null)
        if (libroStatus) {
          return window.alert('Este libro ya se encuentra prestado!')
        }

        const response = await axios.put(
          'http://localhost:3005/libro/prestar/' + props.libroId,
          editLibro
        );
        if (!response.data || response.data?.length == 0) return;
        dispatch({ type: 'PRESTAR_ITEM', payload: editLibro });
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setPersona('');
        props.handleRender();
        props.handleModalPrestar();
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
