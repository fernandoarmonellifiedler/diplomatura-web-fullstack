/* Diferentes tipos de testeo

- Unitarios: pruebas individuales de cada módulo/componente del sistema.

- De Integración: se prueba justamente la integración de los módulos/componentes. El foco está puesto en el enlace entre módulos/componentes. La "salida" de un módulo que alimenta la "entrada" de otro. Estos testeos suelen ser un poco más complejos. Deberían
realizarse una vez que hayan sido aprobados los test unitarios de los respectivos módulos intervinientes, caso contrario, un error dentro de un módulo provocaría una falla en el testeo de integración y podría resultar difícil detectar el punto de error.

- Funcionales: pruebas realizadas desde fuera del sistema (black box). Aquí se prueba una función de las que el sistema ofrece, no nos concentramos en el cómo lo hace sino en que lo haga.

- End-To-End (e2e): prueba de la aplicación en un entorno similar al real. Aquí se prueba todo el sistema, ya lo hemos concluido y antes de entregarlo realizamos las pruebas generales para asegurarnos que su funcionamiento es correcto.

- Aceptación: prueba del usuario para verificar que el sistema cumple con los requerimientos solicitados. Este tipo de pruebas se realizan con un documento de aceptación donde se especifica los requerimientos realizados previamente por el cliente.
*/