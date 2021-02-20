/* Notas AVS 18/02/21

- advent of code 2020 (pagina web con desafios)
- nueva entrega del tp 01/03

- recordar que todos los hooks son asincronicos

consulta Cristina (en el archivo)
- tenemos variables globales que producen un renderizado, una actualizacion del componente y otras que no. las que producen el renderizado son los estados
*/

// duda de consulta
import React from 'react';
import axios from 'axios';

const LibroList = () => {
  const [contador, setContador] = useState(1);

  setInterval(() => {
    const contAux = contador + 1;
    setContador(contAux);
  }, 100);

  return (
    <>
      <h1>{contador}</h1>
    </>
  );
};

export default LibroList;

/* 
- aqui estamos metiendo en libros lo que trajimos del servidor
*/
// ejemplo agregando libros / usando useEffect
import React from 'react';
import axios from 'axios';

const LibroList = () => {
  const url = 'http://localhost:3000';

  const [libro, setLibro] = useState(1);
  const [libros, setLibros] = useState([]);

  // traer libros cuando se carga la pagina
  useEffect(async () => {
    try {
      const respuesta = await axios.get(url + '/libros');
      console.log(respuesta);
      setLibros(response.data);
    } catch (e) {
      console.log('error:', e);
    }

    /* usando promise
    const respuesta = axios.get(url + '/libros')
      .then(res => {
        console.log(res.data);
        setLibros(res.data)
      })
      .catch(error => console.log('error'))
    */
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>descripcion</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => {
            return (
              <tr>
                <td>{libro.nombre}</td>
                <td>{libro.descripcion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LibroList;

/* 
validando la informacion
- podemos hacerlo en diferentes lugares. podemos verificarlo en setLibros. hariamos el renderizado solo cuando la respuesta es válida
*/

//try {
  const respuesta = await axios.get(url + '/libros');
  console.log(respuesta);
  if (!response.data || response.data?.length === 0) {
    return;
  }
  setLibros(response.data);
//}

/*
sobre keys: 
- cuando creamos componentes dinámicos react pide agregar keys asi que agregamos un dato que sea unico al elemento

return (
  <tr key={libro.id}>
    <td>{libro.nombre}</td>
    <td>{libro.descripcion}</td>
  </tr>
);
*/

/* 
para hacer un post
*/

const handleChangeNombre = {event} => {
  const libroAux = {
    nombre: event.target.value,
    descripcion: libro.descripcion
  }
  setLibro(libroAux)
}

const handleOnClick = async () {
  try {
    let response= await axios.post(url + '/libro', libro);
    response = await axios.get(url + '/libro', libro);
    
  }
  catch(e) {
    console.log(e);
  }
}