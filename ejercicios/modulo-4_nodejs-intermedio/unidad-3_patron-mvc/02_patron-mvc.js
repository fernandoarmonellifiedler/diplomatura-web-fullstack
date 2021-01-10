/* El patrón de diseño MVC

El patrón de diseño Modelo-Vista-Controlador es un patrón que separa los datos de la lógica de negocios de la aplicación. Propone la construcción de 3 componentes distintos que son el modelo, la vista y el controlador.

• Modelo: solo contiene datos, no contiene lógica.
• Vista: presenta al usuario los datos del modelo.
• Controlador: entre la vista y el modelo, escucha los sucesos y ejecuta la reacción apropiada

Cuando diseñamos una aplicación siguiendo el patrón de diseño MVC, vamos a crear 3 tipos diferentes de archivos. Se suele utilizar carpetas distintas para los modelos, las vistas y los controladores.

La capa de datos (modelo) contendrá un archivo por cada tabla de la base de datos. Allí se incluirán las consultas necesarias para la tabla en particular.

La capa de presentación (vista) “conoce” al modelo que va a mostrar, pero el modelo no “conoce” a la vista. La vista es invocada por el controlador con los datos que obtuvo del modelo.

La capa de lógica de negocio (controlador) tendrá la tarea de comunicarse con el exterior, aplicar la lógica de negocio, invocar a las vistas necesarias y devolverlas al cliente.

En cuanto a la vista, es menester aclarar que puede tratarse tanto de mensajes JSON por ejemplo, o bien templates creados con un motor como Handlebars, etc. La vista es la información a responder al cliente que la ha solicitado. La forma que tome dicha información depende de cada proyecto.

*/