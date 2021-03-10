import React, { useState } from 'react';
import axios from 'axios';

// COMPONENTE MODAL PARA PRESTAR
const LibroPrestar = (props) => {
  const [persona, setPersona] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (persona) {
        const libroSelected = props.listaLibros.find(
          (unLibro) => unLibro.id == props.libroPrestarId
        );
        if (libroSelected.persona_id !== null) {
          return window.alert('Este libro ya se encuentra prestado!');
        }

        const prestarLibro = {
          nombre_libro: libroSelected.nombre_libro,
          descripcion: libroSelected.descripcion,
          categoria_id: libroSelected.categoria_id,
          persona_id: persona,
        };

        const unaPersona = props.listaPersonas.find(
          (unaPersona) => unaPersona.id == persona
        );
        if (!unaPersona) {
          return window.alert('Ese Id de persona no existe');
        }

        const response = await axios.put(
          'http://localhost:3005/libro/prestar/' + props.libroPrestarId,
          prestarLibro
        );
        if (!response.data || response.data?.length == 0) return;
        props.dispatch({ type: 'BOOK_PRESTAR_ITEM', payload: prestarLibro });
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
          <h3 className='cat-edit-h3'>Prestar libro</h3>
          <button className='btn cat-edit-btn' onClick={props.handlePrestar}>
            X
          </button>
        </header>
        <form className='form cat-modal-form'>
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
          <button type='submit' onClick={handleSubmit}>
            Prestar Libro
          </button>
        </form>
      </section>
    </>
  );
};

export default LibroPrestar;
