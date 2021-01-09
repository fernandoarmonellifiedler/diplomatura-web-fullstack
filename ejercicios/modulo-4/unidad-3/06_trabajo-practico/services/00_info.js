/* Services

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

*/