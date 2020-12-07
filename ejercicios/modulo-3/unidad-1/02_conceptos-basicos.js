/* Conceptos básicos
Motor V8 de Chrome
● Es el motor de JavaScript de Google
● Compila JavaScript a código nativo
● Implementa ECMA-262
● Utilizado en Chromium y Node.js (entre otros productos)
● Está realizado en C++
● OpenSource
● Maneja automáticamente la asignación de memoria y garbage collection

El código fuente y documentación están disponibles en el sitio oficial de V8,
https://developers.google.com/v8/

Stack (básico)

App
-------
Node.js
V8
S.O.

QUE SE NECESITA PARA CORRER UN SERVIDOR
● Reutilizar código
● Manejar archivos
● Manejar bases de datos
● Comunicarse a través de internet
● Poder aceptar peticiones y enviar respuestas
● Manejar operaciones que demoren

NodeJS y V8 son SingleThreaded (un único hilo) lo que presenta un problema para manejar operaciones de entrada/salida.

Es por esto que se añade Libuv que es una biblioteca que permite realizar procesos de
entrada/salida (e/s) de manera asincrónica y simple.

libuv es una biblioteca de soporte multiplataforma con foco en las operaciones de
E/S asincrónicas
para mayor información sobre libuv http://libuv.org
*/