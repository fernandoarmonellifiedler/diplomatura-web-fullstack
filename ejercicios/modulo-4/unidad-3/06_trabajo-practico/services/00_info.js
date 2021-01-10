/* Services

De forma muy general, los servicios son una forma de dividir lo que el patrón MVC incluye en el controller. El patrón MVC deja en
manos del controller la lógica de negocio y la conexión de la aplicación con el exterior. En
NodeJS, el controller sería el encargado tanto del ruteo como de la lógica del negocio. 

Patrón MVC + Service significa agregar una capa extra para dividir la lógica del controller
en dos partes:
● Ruteo, conexión con el exterior, validación primaria de datos -> Controller
● Lógica de negocio, conexión con el model -> Service
Básicamente se desacopla la lógica de negocio de la lógica de conexión exterior.

--------------------------------
Por lo general, habrá uno por modelo aunque es posible que haya más. Los services
contienen la lógica de negocio de la aplicación que involucra:

    + Validación de los datos de entrada conforme lo requiera el proyecto, por ejemplo,
verificar que los CUIT (Clave Unica de Identificación Tributaria Argentina) sean
válidos (existe un algoritmo para ello). Y vale la aclaración que mientras el
controller verificará que este campo llegue, tenga datos y que esos datos
corresponden al formato de CUIT (nn-nnnnnnnn-n), será el service el encargado de
comprobar que dicho valor cumpla las especificaciones de la fórmula de CUIT.
    + Procesamiento de los datos recibidos.
    + Consultas a los modelos necesarios.
    + Procesamiento de las respuesta recibidas de las consultas
    + Retorno de los datos al controlador que invoco al service.

Al crear un service, se suele agregar al nombre la palabra “Service”, por ejemplo,
personaService.js

--------------------------------
En el service se implementa la lógica de negocios más profunda, se trabaja con los
models y se responde a los controllers. Si fuera requerido realizar cálculos o
transformaciones de datos, aquí sería el lugar donde sucedería.

*/