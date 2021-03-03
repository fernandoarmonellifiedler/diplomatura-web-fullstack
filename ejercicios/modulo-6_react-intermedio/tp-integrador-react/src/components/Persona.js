import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // genera id unicos
import PersonaEdit from '../components/PersonaEdit.js';

// COMPONENTE PRINCIPAL
const Persona = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  // funcion para re-renderizar componentes
  const handleRender = async () => {
    try {
      const response = await axios.get('http://localhost:3005/persona');
      if (!response.data || response.data?.length == 0) return;
      props.dispatch({ type: 'FETCH_PERSONA_LIST', payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  // funcion para abrir/cerrar el modal
  const handleModalEdit = () => {
    props.dispatch({
      type: 'SWITCH_PERSONA_EDIT_MODAL',
      payload: props.state.personaEditModal,
    });
  };

  // ADD nueva persona
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nombre && apellido && alias && email) {
        const nuevaPersona = {
          nombre: nombre.toUpperCase(),
          apellido: apellido.toUpperCase(),
          alias: alias.toUpperCase(),
          email: email.toUpperCase(),
        };

        const findEmail = props.state.personas.find(
          (unaPersona) => unaPersona.email == nuevaPersona.email
        );
        if (findEmail) {
          return window.alert('Ese email ya se encuentra registrado!');
        }

        const response = await axios.post(
          'http://localhost:3005/persona',
          nuevaPersona
        );
        if (!response.data || response.data?.length == 0) return;
        props.dispatch({ type: 'PERSONA_ADD_ITEM', payload: nuevaPersona });
        setNombre('');
        setApellido('');
        setAlias('');
        setEmail('');
        handleRender();
      } else {
        window.alert('Todos los campos son obligatorios');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE persona
  const handleDelete = async (e) => {
    const personaId = e.target.value;
    try {
      const libros = await axios.get('http://localhost:3005/libro');
      if (!libros.data || libros.data?.length == 0) return;
      props.dispatch({ type: 'FETCH_BOOK_LIST', payload: libros.data });

      const findLibro = libros.data.find(
        (unLibro) => unLibro.persona_id == personaId
      );
      if (findLibro) {
        return window.alert(
          'Debes devolver el libro para poder borrar este usuario'
        );
      }

      const response = await axios.delete(
        'http://localhost:3005/persona/' + personaId
      );
      if (!response.data || response.data?.length == 0) return;
      props.dispatch({ type: 'PERSONA_REMOVE_ITEM', payload: personaId });
    } catch (e) {
      console.log(e);
    }
  };

  // PUT persona
  const handleEdit = (e) => {
    const personaId = e.target.value;
    if (personaId) {
      handleModalEdit();
      setId(personaId);
    } else {
      handleModalEdit();
    }
  };

  return (
    <>
      {/* Modal para editar persona */}
      {props.state.personaEditModal && (
        <PersonaEdit
          personaId={id}
          handleEdit={handleEdit}
          listaPersonas={props.state.personas}
          handleRender={handleRender}
          handleModalEdit={handleModalEdit}
          dispatch={props.dispatch}
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
        {props.state.personas.map((unaPersona) => {
          const { id, nombre, apellido, alias, email } = unaPersona;
          const tieneLibros = props.state.libros.filter(
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

export default Persona;
