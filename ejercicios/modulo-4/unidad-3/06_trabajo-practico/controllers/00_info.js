/* Controllers

La capa de lógica de negocio (controlador) tendrá la tarea de comunicarse con el exterior,
aplicar la lógica de negocio, invocar a las vistas necesarias y devolverlas al cliente.

--------------------------------
En proyectos pequeños todos los controllers podrían estar contenidos dentro del app.js En
proyectos un poco más grandes es conveniente crear una carpeta y hacer un controller
por cada ruta.

Los controllers van a encargarse de hacer una primera validación de la información
recibida. Se orienta a verificar que se hayan recibido todos los parámetros necesarios y
que los mismos contengan el tipo de dato requerido. El resto de las validaciones referidas
a la lógica de negocio se realizan en los services.

Serán los controllers los encargados también de enviarle a las vistas los datos obtenidos
de los services y responder con la respuesta de las vistas al cliente que realizó la petición.

Al crear los controladores, se suele utilizar como parte del nombre la palabra “Controller”,
por ejemplo personaController.js

--------------------------------
El controller se encarga de verificar la información que será enviada a los services.
Verifica que los datos obtenidos cumplan con la lógica de negocios.
*/