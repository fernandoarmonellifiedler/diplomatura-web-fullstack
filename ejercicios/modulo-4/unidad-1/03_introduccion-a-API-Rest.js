/*  Introducción a API Rest

Conceptos de API REST
API significa Interfaz de Programación de Aplicación (Application Programming
Interfaces).

Una API es una herramienta que hace que un sitio web sea consumible por una computadora. A través de él, una computadora puede ver y editar datos, tal como lo hace una persona cargando páginas y enviando información por medio de formularios.

                    Servidor
                 |  Sitio Web | <--- Usuario
Computadora ---> |    API     |

Cuando un sistema se enlaza a través de una API, decimos que los mismos se encuentran integrados. Un lado es el servidor que publica la información por medio de la API, y el otro lado es el cliente que consume y manipula la API.

--------------------------------
Creación de una API Rest en Express

Conceptos previos:

1) Formato de datos
Tanto el cliente como el servidor deben poder interpretar los datos que entre ellos intercambian, es por ello que se utilizan standards de codificación de datos para que ambos se puedan entender. Los dos formatos de datos más utilizados son JSON y XML.

JSON
Es un formato simple que se basa en dividir los datos en clave-valor.

{
"curso": "NodeJS nivel Intermedio"
}

XML
Tiene una estructura de árbol compuesta por bloques. El bloque principal es llamado nodo, y a partir de él se crean nodos hijos (como si fueran ramas). El nombre del nodo nos indica el atributo (clave) y la información contenida en el dato el valor.

<curso>NodeJS nivel intermedio</curso>

2) Uso del formato de datos
A través de los encabezados, el cliente le puede indicar al servidor que formato de dato utiliza para codificar la información, e indicar en qué formato de dato espera la respuesta. Generalmente para los servicios REST, el formato de datos utilizado es JSON.

● Content-type: por medio de este encabezado, el cliente le indica al servidor el
formato en el cual está enviando la información.
● Accept: por medio de este encabezado, el cliente le indica al servidor qué tipo de
formato es el que espera en la respuesta.

--------------------------------

Ejemplo:
Ya hemos visto cómo es la comunicación entre el cliente y servidor de una API REST, ahora vamos a ver un ejemplo de cómo se manejan los recursos, para ello vamos a tomar el ejemplo de los recursos para administrar una persona.

Método | URL          | Acción
GET      /artistas      Lista los artistas existentes
POST     /artistas      Agrega un nuevo artistas
GET      /artistas/1    Retorna el artistas con identificador 1
GET      /artistas/20   Retorna el artistas con identificador 20
PUT      /artistas/3    Actualiza el artistas con identificador 3
DELETE   /artistas/8    Borra el artistas con identificador 8

Los métodos POST y PUT son con los cuales el cliente envía contenido en el cuerpo de la petición (ya que debe enviar los datos de la persona, ya sea para crear una nueva POST, o para actualizar una existente PUT).

(gráficos con ejemplos de solicitudes, pag. 20)

----------------
1) Ejemplo de solicitud de todas los artistas

======= | ---> GET /artistas ---> | =======
Cliente |                         | Servidor
======= | <--- Status: 200 <---   | =======

Cuerpo de la respuesta: 
    [
        {"_id": "123", "nombre": "xxxx1"},
        {"_id": "124", "nombre": "xxxx2"}
    ]

----------------
2) Ejemplo de solicitud del artista con identificador 123

======= | ---> GET /artistas/123 ---> | =======
Cliente |                             | Servidor
======= | <---    Status: 200 <---    | =======

Cuerpo de la respuesta: 

        {"_id": "123", "nombre": "xxxx1"}

----------------
3) Ejemplo de solicitud de creación de un artista

Cuerpo de la petición: 
    
        {"nombre": "nuevo nombre"}

======= | ---> POST /artistas ---> | =======
Cliente |                         | Servidor
======= | <--- Status: 201 <---   | =======

Cuerpo de la respuesta: 
    
        {"_id": "125", "nombre": "nuevo nombre"}

----------------
4) Ejemplo de solicitud de modificación del artista con identificador 125

Cuerpo de la petición: 
    
        {"nombre": "nuevo nombre modificado"}

======= | ---> PUT /artistas/125 ---> | =======
Cliente |                             | Servidor
======= | <---   Status: 200   <---   | =======

Cuerpo de la respuesta: 
    
        {"_id": "125", "nombre": "nuevo nombre modificado"}
        
----------------
5) Ejemplo de solicitud de eliminación del artista con identificador 125

======= | ---> DELETE /artistas/125 ---> | =======
Cliente |                                | Servidor
======= | <---     Status: 204    <---   | =======

--------------------------------
API REST con recursos enlazados
Si queremos agregar un recurso que depende de otro, por ejemplo, si queremos agregar una canción a un recurso artista, debemos tener una forma de poder manejar dicha asociación de una manera clara y sencilla. Para ello podemos agregar recursos que
dependan de otro recurso, esto lo manejamos a través de la URL a la cual se realiza la petición. Tomemos como ejemplo la administración de las canciones de un artista. Para solicitar todos los recursos canciones asociados al recurso artista con identificador 8, podríamos realizar la siguiente petición:

GET /artistas/8/canciones

Con la cual estamos solicitando todas las canciones, del recurso artista, cuyo identificador (de artista) es el 8.

La administración total de las canciones quedaría:

Método | URL                       | Acción
GET      /artistas/<id>/canciones    Lista los canciones existentes para el artista especificado
POST     /artistas/<id>/canciones    Agrega una nueva canción al artista especificado
GET      /artistas/<id>/canciones/3  Retorna la canción con identificador 3 para el artista especificado
PUT      /artistas/<id>/canciones/3  Actualiza la canción con identificador 3 para el artista especificado
DELETE   /artistas/<id>/canciones/4  Elimina la canción con identificador 4 para el artista especificado

--------------------------------
Ejemplo
Hemos creado una aplicación de ejemplo en Express que implementa la API REST que hemos utilizado en esta unidad (/artistas y /artistas/<id>/canciones) a la cual puedes acceder en:

https://github.com/cursos-utn/nodejs-intermedio/tree/m1u4_cancion_hbs

--------------------------------
Trabajo Práctico
Utilizar los conceptos aprendidos en esta unidad para crear una pequeña aplicación de temática libre.
*/