import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer } from '../reducers/personaReducer'; // import reducer
import { v4 as uuidv4 } from 'uuid'; // genera id unicos

// reducer: default state
const defaultState = {
  personas: [],
};

const Persona = () => {
  // state de persona nuevo
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');

  // useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

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
  // envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // evita aguegar campos vacios
    if (nombre && apellido && alias && email) {
      const nuevaPersona = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        alias: alias.toUpperCase(),
        email: email.toUpperCase(),
      };
      // agregar persona al state
      dispatch({ type: 'ADD_ITEM', payload: nuevaPersona });
      // axios POST
      axios.post('http://localhost:3005/persona', nuevaPersona);
      // borrar campos luego de agregar el item
      setNombre('');
      setApellido('');
      setAlias('');
      setEmail('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  const handleDelete = (e) => {
    const personaId = e.target.value;
    console.log(personaId);
    dispatch({ type: 'REMOVE_ITEM', payload: personaId });
    axios.delete('http://localhost:3005/persona/' + personaId);
  };

  const handleEdit = (e) => {};

  return (
    <>
      <section className='section'>
        <header>
          <h2>Agregar persona</h2>
        </header>

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

        <h3>Listado de personas</h3>
        {/* iterando sobre la lista de personas de la base de datos */}
        {state.personas.map((unaPersona) => {
          const { id, nombre, apellido, alias, email } = unaPersona;
          return (
            <div className='item' key={id || uuidv4()}>
              <div className='item-datos'>
                <p>Nombre: {nombre || 'sin nombre'}</p>
                <p>Apellido: {apellido || 'sin apellido'}</p>
                <p>Alias: {alias || 'sin alias'}</p>
                <p>Email: {email || 'sin email'}</p>
                <p>Libros Prestados: || Sin Libros</p>
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

export default Persona;
