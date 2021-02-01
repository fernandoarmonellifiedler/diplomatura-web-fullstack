/* Introducción a AXIOS

Cuando deseamos conectarnos con servidores remotos por medio del protocolo HTTP, es recomendable utilizar algún paquete NPM que haga más fácil la comunicación con dichos equipos. En este curso utilizaremos el paquete axios.

Para instalar axios debemos acceder por línea de comando a la carpeta del proyecto React y ejecutar

npm install --save axios

----------------------------
Conexión con el servidor
Para utilizar axios en un componente, generalmente, incorporamos el código en el método componentDidMount(), quedando de la siguiente forma.

import axios from 'axios';
//...

async componentDidMount() {
 var respuesta = await axios.get('<url del servidor>');
}

Primero indicamos que deseamos utilizar axios en nuestro componente.
En el método componentDidMount() realizamos la petición al servidor remoto por medio de axios.get(). La respuesta es guardada en la variable respuesta.

Axios dispone de diferentes métodos para ser llamado:
● axios.get(‘url’) para hacer un HTTP GET a la URL especificada
● axios.post(‘url’, objJSON) para hacer un HTTP POST a la URL especificada enviando el objJSON indicado
● axios.put(‘url’, objJSON) para hacer un HTTP PUT a la URL especificada enviando el objJSON indicado (por put)
● axios.delete(‘url’) para hacer un HTTP delete a la URL especificada

La respuesta de axios dispone de las siguientes propiedades principales:
● status (respuesta.status) nos permite acceder al código numérico HTTP de respuesta (Ej: 200)
● data (respuesta.data) nos permite acceder al contenido enviado por el servidor (generalmente un JSON)
*/