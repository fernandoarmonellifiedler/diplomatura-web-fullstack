/* API REST con recursos enlazados
Si queremos agregar un recurso que depende de otro, por ejemplo, si queremos agregar una canción a un recurso artista, debemos tener una forma de poder manejar dicha asociación de una manera clara y sencilla.

Para ello podemos agregar recursos que dependan de otro recurso, esto lo manejamos a través de la URL a la cual se realiza la petición. Tomemos como ejemplo la administración de las canciones de un artista. Para solicitar todos los recursos canciones asociados al recurso artista con identificador 8, podríamos realizar la siguiente petición:

GET /artistas/8/canciones

Con la cual estamos solicitando todas las canciones, del recurso artista, cuyo identificador (de artista) es el 8.

La administración total de las canciones quedaría:

Método | URL                        | Acción
GET      /artistas/<id>/canciones     Lista los canciones existentes para el artista especificado
POST     /artistas/<id>/canciones     Agrega una nueva canción al artista especificado
GET      /artistas/<id>/canciones/3   Retorna la canción con identificador 3 para el artista especificado
PUT      /artistas/<id>/canciones/3   Actualiza la canción con identificador 3 para el artista especificado
DELETE   /artistas/<id>/canciones/4   Elimina la canción con identificador 4 para el artista especificado

--------------------------------
Ejemplo
Hemos creado una aplicación de ejemplo en Express que implementa la API REST que hemos utilizado en esta unidad (/artistas y /artistas/<id>/canciones) a la cual puedes acceder en:

https://github.com/cursos-utn/nodejs-intermedio/tree/m1u4_cancion_hbs

--------------------------------
Trabajo Práctico
Utilizar los conceptos aprendidos en esta unidad para crear una pequeña aplicación de temática libre.
*/