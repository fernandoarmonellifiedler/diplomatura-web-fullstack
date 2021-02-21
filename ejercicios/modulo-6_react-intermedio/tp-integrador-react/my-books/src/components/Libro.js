import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Libro = () => {
  // lista de libros
  const [libros, setLibros] = useState([]);
  // nombre y descripcion de libro nuevo
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      setLibros(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && descripcion) {
      const nuevoLibro = { id: '', nombre, descripcion };
      setLibros((libros) => {
        return [...libros, nuevoLibro];
      });
      setNombre('');
      setDescripcion('');
    } else {
      window.alert('No puedes ingresar valores en blanco');
    }
  };

  return (
    <>
      <section className='section'>
        <header>
          <h2>Agregar nuevo libro</h2>
        </header>

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
          <button type='submit'>Agregar Libro</button>
        </form>

        <h2>Listado de libros</h2>
        {libros.map((unLibro) => {
          return (
            <div className='item' key={unLibro.id}>
              <h4>{unLibro.nombre_libro}</h4>
              <p>{unLibro.descripcion}</p>
              <p>{unLibro.categoria_id}</p>
              <p>{unLibro.persona_id}</p>
              <button className='btn'>Editar</button>
              <button className='btn'>Eliminar</button>
              <button className='btn'>prestar / devolver</button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Libro;
