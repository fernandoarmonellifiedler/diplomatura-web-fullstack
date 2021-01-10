/* 
1. Concepto de asincronismo
Operaciones asincrónicas
Las operaciones asincrónicas son aquellas que al llamarlas, la respuesta demora y/o no
puede ser procesada en el momento. Las operaciones más comunes que son tratadas de
esta forma son:
● Operaciones sobre archivos (solo para JavaScript del lado del servidor)
● Operaciones sobre bases de datos (solo para JavaScript del lado del servidor)
● Conexión y consulta a servidores externos
Las operaciones asincrónicas se pueden tratar de diferentes formas: callbacks, promises,
async/away

Cómo trabaja JavaScript
En JavaScript todas las operaciones de E/S son asincrónicas
● Conexión con un servidor remoto por medio de HTTP
● Timers
● Del lado del servidor (NodeJS)
○ Consultas a la base de datos
○ Operaciones sobre archivos
Puede ser por medio de:
● Callbacks
● Promises
*/