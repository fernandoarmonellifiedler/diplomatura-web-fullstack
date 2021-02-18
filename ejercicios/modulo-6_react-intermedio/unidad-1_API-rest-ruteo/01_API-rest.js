/* Uso de una API Rest

----------------------------------
Conceptos básicos de interacción con otros servicios
Durante esta unidad, nosotros seremos los que consumiremos recursos de aplicaciones externas para alimentar a nuestra aplicación, por medio de la creación de un cliente REST.

----------------------------------
Importancia de la conexión con servicios externos
Cada día tenemos más exigencias para el desarrollo de nuestras aplicaciones, necesitamos brindar gran cantidad de información a nuestros clientes. También existen cada vez más cantidad de fuentes de información.

El procesar la información que existe de una o varias aplicaciones que ya existen en Internet de manera manual, implicaría que debamos dedicar mucho tiempo al mantenimiento de la aplicación, y la misma siempre se encontraría desactualizada. Es por eso que podemos aprovechar las API que tienen varias aplicaciones de Internet, para consumir los recursos de ellas, en el momento que los necesitemos.

Al igual que cuando necesitamos información de nuestra base de datos hacemos una consulta para recuperar dicha información, podemos seguir los mismos pasos para consumir datos de una aplicación que expone sus datos por medio de una API REST.

Al conectar nuestra aplicación en tiempo real podremos:

● Acceder siempre a la última información
● Poder generar información útil para nuestra aplicación y usuarios
● Poder integrar información de varios servicios
● Reducir los tiempos de desarrollo (si ya existe una aplicación que hace lo que necesitamos, podemos integrarnos de inmediato)

Existen gran cantidad de aplicaciones a las cuales podemos conectarnos por medio de esta tecnología, a continuación mencionaremos solo algunas:

Servicio                   Descripción
MercadoLibre               Permite realizar gran parte de las operaciones que podemos realizar desde su sitio web por medio de una API REST. Podemos buscar productos, hacer el seguimiento de una venta, administrar las preguntas y respuestas, recibir notificaciones, etc.

MercadoPago                Permite gestionar cobros desde nuestra aplicación haciendo uso de sus servicios, permitiéndonos integrar sus funciones con nuestra aplicación. Fácilmente podemos automatizar los cobros.

PayPal                     Permite gestionar cobros desde nuestra aplicación haciendo uso de sus servicios, permitiéndonos integrar sus funciones con nuestra aplicación. Fácilmente podemos automatizar los cobros.

GOOGLE                     Permite utilizar gran cantidad de servicios de GOOGLE, entre ellos la búsqueda de direcciones y su validación.

AWS (Amazon Web Services)  Permite que gestionemos servidores por medio de una API contra la cual podemos conectar nuestras aplicaciones.

Facebook                   Permite que realicemos gran parte de las operaciones que podemos usar desde su sitio web por medio de su API.

Twitter                    Permite que realicemos gran parte de las operaciones que podemos usar desde su sitio web por medio de su API.

Slack                      Permite que realicemos varias de las operaciones que podemos usar desde su sitio web por medio de su API.

Weather Underground        Permite que podamos acceder a información climática desde nuestra aplicación por medio de su API.


----------------------------------
Formas de conexión con servicios externos
La forma más habitual de interconectar aplicaciones entre sí es por medio de API REST. En la cual ambas partes (cliente y servidor) hablan un mismo lenguaje y saben cómo intercambiar información.

Las integración por peticiones HTTP - API REST son las que más crecimiento han tenido en los últimos años, siendo hoy el estándar más popular para el desarrollo de nuevas integraciones.

Ya sea que deseemos acceder a información del clima, enviar un mensaje por slack indicando el fin de un proceso, conocer si una dirección es válida, o permitir que nuestros usuarios puedan realizar un pago y procesarlo en el momento, las APIs REST nos permiten realizar todas estas tareas con solo realizar la conexión con ellas por medio de HTTP.

Para poder conectar nuestra aplicación a cualquier API REST, siempre debemos primero comenzar con leer la documentación, para poder conocer cuales son los recursos a los cuales se pueden acceder, y cómo se accede a cada uno de ellos.

La conexión con una API puede ser una tarea muy sencilla o muy compleja dependiendo de nuestras necesidades. Generalmente las API de consulta de información son muy sencillas de utilizar (por ejemplo, consultar el clima), mientras que las API de pagos, son un poco más complejas porque involucra varios pasos (y el posterior seguimiento del pago). Siempre el beneficio es mayor que tener que desarrollar nosotros la funcionalidad que ya nos entrega el proveedor de la API.


----------------------------------
Comunicación HTTP - Conexión con servidores
Cuando deseamos conectarnos con servidores remotos por medio del protocolo HTTP, es recomendable utilizar algún paquete NPM que haga más fácil la comunicación con dichos equipos. En este curso utilizaremos el paquete axios.
Para instalar axios debemos acceder por línea de comando a la carpeta del proyecto React y ejecutar

npm install --save axios

Para utilizar axios en un componente, generalmente, incorporamos el código en el método componentDidMount(), quedando de la siguiente forma.

import axios from 'axios';
// ...
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