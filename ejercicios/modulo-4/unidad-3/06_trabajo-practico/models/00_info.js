/* Models

La capa de datos (modelo) contendrá un archivo por cada tabla de la base de datos. Allí
se incluirán las consultas necesarias para la tabla en particular.

--------------------------------
Dentro de la carpeta models va la representación de cada una de las tablas de la base de
datos y sus respectivas consultas.

Será un archivo por tabla. En caso de consultas que involucren más de una tabla, el
service se encargará de dicha lógica, invocando los modelos necesarios en el orden
requerido para completar la consulta final.

Los modelos serán invocados por los services.

--------------------------------
El modelo realiza las consultas a la base de datos y devuelve la información.

*/