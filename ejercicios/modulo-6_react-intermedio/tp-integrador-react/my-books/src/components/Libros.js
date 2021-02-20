import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Libros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3005/libro');
      if (!response.data || response.data?.length == 0) return;
      setLibros(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(typeof libros);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {/* {libros.map((unLibro) => {
            return <p>{unLibro.nombre_libro}</p>;
          })} */}
        </tbody>
      </table>
    </>
  );
};

export default Libros;
