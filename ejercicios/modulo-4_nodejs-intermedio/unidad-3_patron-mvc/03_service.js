/* Concepto de Service

Haciendo un reduccionismo, los servicios son una forma de dividir lo que el patrón MVC incluye en el controller. Como vimos en secciones anteriores, el patrón MVC deja en manos del controller la lógica de negocio y la conexión de la aplicación con el exterior. En NodeJS, el controller sería el encargado tanto del ruteo como de la lógica del negocio. Sin embargo si bien el patrón MVC trae ventajas por la división que ofrece, aún queda demasiado en el controller. Los servicios vienen a mejorar la lógica del controller para dividirla y hacerla más mantenible.

Patrón MVC + Service significa agregar una capa extra para dividir la lógica del controller en dos partes:

● Ruteo, conexión con el exterior, validación primaria de datos -> Controller
● Lógica de negocio, conexión con el model -> Service

Básicamente se desacopla la lógica de negocio de la lógica de conexión exterior.

            Controllers

    Services              Views

               Models
*/