/* Implementación de MVC + Service en Express

Para la implementación del patrón MVC + Services se sugiere la creación de un árbol de
directorios (carpetas) para estructurar el proyecto.

Se sugiere la creación de una carpeta que contenga los controladores, otra para las
vistas, una más para los models y finalmente una carpeta para los services. Quedando el
app.js en la raíz del proyecto.

-------------------------
Models

Dentro de la carpeta models va la representación de cada una de las tablas de la base de
datos y sus respectivas consultas.

Será un archivo por tabla. En caso de consultas que involucren más de una tabla, el
service se encargará de dicha lógica, invocando los modelos necesarios en el orden
requerido para completar la consulta final.

Los modelos serán invocados por los services.

-------------------------
Views

Las vistas son las representaciones de la información que el sistema responde a sus
clientes. Están íntimamente relacionadas con los modelos aunque no necesariamente
haya una vista por cada modelo, en realidad, habrá tantas vistas como respuestas de
información se requiera.

Las vistas pueden ser desde JSONs hasta motores de templates. Depende del proyecto
la forma que tomarán las vistas. Por ejemplo, en un proyecto con cliente ReactJs, las
vistas serán JSONs.

Las vistas pueden contener datos de más de un modelo, por ejemplo, si se requiere
responder con la información de una factura, la vista contendrá tanto la información del
encabezado de la factura (de un modelo) como los diferentes ítems de la factura (alojados
en otro modelo).

-------------------------
Controllers

En proyectos pequeños todos los controllers podrían estar contenidos dentro del app.js En
proyectos un poco más grandes es conveniente crear una carpeta y hacer un controller
por cada ruta.

Los controllers van a encargarse de hacer una primera validación de la información
recibida. Se orienta a verificar que se hayan recibido todos los parámetros necesarios y
que los mismos contengan el tipo de dato requerido. El resto de las validaciones referidas
a la lógica de negocio se realizan en los services.

Serán los controllers los encargados también de enviarle a las vistas los datos obtenidos
de los services y responder con la respuesta de las vistas al cliente que realizó la petición.
A
l crear los controladores, se suele utilizar como parte del nombre la palabra “Controller”,
por ejemplo personaController.js

-------------------------
Services

Por lo general, habrá uno por modelo aunque es posible que haya más. Los services contienen la lógica de negocio de la aplicación que involucra:

+ Validación de los datos de entrada conforme lo requiera el proyecto, por ejemplo, verificar que los CUIT (Clave Unica de Identificación Tributaria Argentina) sean válidos (existe un algoritmo para ello). Y vale la aclaración que mientras el controller verificará que este campo llegue, tenga datos y que esos datos corresponden al formato de CUIT (nn-nnnnnnnn-n), será el service el encargado de comprobar que dicho valor cumpla las especificaciones de la fórmula de CUIT.

+ Procesamiento de los datos recibidos.
+ Consultas a los modelos necesarios.
+ Procesamiento de las respuesta recibidas de las consultas
+ Retorno de los datos al controlador que invoco al service.

Al crear un service, se suele agregar al nombre la palabra “Service”, por ejemplo, personaService.js
*/