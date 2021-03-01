import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/personaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  personas: [],
  personaEditModal: false,
  listaLibros: [],
};

// COMPONENTE PRINCIPAL
const Persona = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState); // useReducer
  const [id, setId] = useState('');

  // buscar lista de personas en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/persona');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);
  // buscar lista de libros en BD
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      dispatch({ type: 'FETCH_LIBRO_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // ADD nueva persona
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && apellido && alias && email) {
      const nuevaPersona = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        alias: alias.toUpperCase(),
        email: email.toUpperCase(),
      };
      axios.post('http://localhost:3005/persona', nuevaPersona);
      dispatch({ type: 'ADD_ITEM', payload: nuevaPersona });
      setNombre('');
      setApellido('');
      setAlias('');
      setEmail('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  // DELETE persona
  const handleDelete = async (e) => {
    const personaId = e.target.value;
    const response = await axios.delete(
      'http://localhost:3005/persona/' + personaId
    );
    if (!response.data || response.data?.length == 0) return;
    dispatch({ type: 'REMOVE_ITEM', payload: personaId });
    axios.delete('http://localhost:3005/persona/' + personaId);
  };

  // PUT persona
  const handleEdit = (e) => {
    const personaId = e.target.value;
    if (personaId) {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.personaEditModal,
      });
      setId(personaId);
      console.log(
        state.listaLibros.find((unLibro) => unLibro.persona_id == personaId)
      );
    } else {
      dispatch({
        type: 'SWITCH_EDIT_MODAL',
        payload: state.personaEditModal,
      });
    }
  };

  return (
    <>
      {/* Modal para editar persona */}
      {state.personaEditModal && (
        <PersonaEdit
          personaId={id}
          handleEdit={handleEdit}
          listaPersonas={state.personas}
        />
      )}
      <section className='section'>
        <header>
          <h2>Agregar persona</h2>
        </header>
        {/* Formulario */}
        <form className='form' onSubmit={handleSubmit}>
          {/* nombre*/}
          <div className='form-control'>
            <label htmlFor='persona-nombre'>Nombre: </label>
            <input
              type='text'
              id='persona-nombre'
              name='persona-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* apellido */}
          <div className='form-control'>
            <label htmlFor='persona-apellido'>Apellido: </label>
            <input
              type='text'
              id='persona-apellido'
              name='persona-apellido'
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          {/* alias */}
          <div className='form-control'>
            <label htmlFor='persona-alias'>Alias: </label>
            <input
              type='text'
              id='persona-alias'
              name='persona-alias'
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          {/* email */}
          <div className='form-control'>
            <label htmlFor='persona-email'>Email: </label>
            <input
              type='text'
              id='persona-email'
              name='persona-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type='submit'>Agregar persona</button>
        </form>
        {/* iterando la lista de personas de la bd */}
        <h3>Listado de personas</h3>
        {state.personas.map((unaPersona) => {
          const { id, nombre, apellido, alias, email } = unaPersona;
          const tieneLibros = state.listaLibros.filter(
            (unLibro) => unLibro.persona_id == id
          );
          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <p>Nombre: {nombre || 'sin nombre'}</p>
                <p>Apellido: {apellido || 'sin apellido'}</p>
                
                <p>Alias: {alias || 'sin alias'}</p>
                <p>Email: {email || 'sin email'}</p>
                <p>
                  {tieneLibros.length !== 0
                    ? 'Libros Prestados: ' +
                      tieneLibros.map((unLibro) => unLibro.nombre_libro)
                    : 'Libros Prestados: no tiene libros'}
                </p>
              </div>

              <div className='item-botones'>
              <p className='item-botones-id'>Id: {id}</p>
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
const PersonaEdit = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const personaSelected = props.listaPersonas.find(
    (unaPersona) => unaPersona.id == props.personaId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && apellido && email && alias) {
      const editPersona = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        alias: alias,
      };

      dispatch({ type: 'EDIT_ITEM', payload: editPersona });
      axios.put(
        'http://localhost:3005/persona/' + props.personaId,
        editPersona
      );
      setNombre('');
      setApellido('');
      setEmail('');
      setAlias('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };
  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className='cat-edit-h3'>Editar persona</h3>
          <button className='btn cat-edit-btn' onClick={props.handleEdit}>
            X
          </button>
        </header>
        <form className='form cat-modal-form' onSubmit={handleSubmit}>
          {/* nombre*/}
          <div className='form-control'>
            <label htmlFor='persona-nombre'>Nombre: </label>
            <input
              type='text'
              id='persona-nombre'
              name='persona-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* apellido */}
          <div className='form-control'>
            <label htmlFor='persona-apellido'>Apellido: </label>
            <input
              type='text'
              id='persona-apellido'
              name='persona-apellido'
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          {/* alias */}
          <div className='form-control'>
            <label htmlFor='persona-alias'>Alias: </label>
            <input
              type='text'
              id='persona-alias'
              name='persona-alias'
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          {/* email */}
          <div className='form-control'>
            <label htmlFor='persona-email'>Email: </label>
            <input
              type='text'
              id='persona-email'
              name='persona-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type='submit'>Editar Persona</button>
        </form>
      </section>
    </>
  );
};

export default Persona;
