/* Diseño de casos de testeo

Documentación de caso de testeo

Lo que caracteriza a la documentación de un caso de testeo es que existe una entrada conocida y una salida esperada que se formulen previo a que se ejecute la prueba.

-------------------------
Estructura de los casos de pruebas

Introducción/visión general: Contiene información general acerca de los Casos de Prueba.
- Identificador: Es un identificador único para futuras referencias, por ejemplo, mientras se describe un defecto encontrado.

- Caso de prueba dueño/creador: Es el nombre del analista o diseñador de pruebas, quien ha desarrollado pruebas o es responsable de su desarrollo.

- Versión: La actual definición del caso de prueba.

- Nombre: El caso de prueba debe tener un título entendible por personas, para la fácil comprensión del propósito del caso de prueba y su campo de aplicación.

- Identificador de requerimientos: el cual está incluido en el caso de prueba. También aquí puede ser un identificador de casos de uso o de especificación funcional.

- Propósito: Contiene una breve descripción del propósito de la prueba, y la funcionalidad que chequea.

- Dependencias: Indica qué otros subsistemas están involucrados y en qué grado.

-------------------------
Actividades de los casos de prueba

- Ambiente de prueba/configuración: Contiene información acerca de la configuración del hardware o software en el cual se ejecutará el caso de prueba.

- Inicialización: Describe acciones, que deben ser ejecutadas antes de que los casos de prueba se hayan inicializado. Por ejemplo, debemos abrir algún archivo.

- Finalización: Describe acciones, que deben ser ejecutadas después de realizado el caso de prueba. Por ejemplo si el caso de prueba estropea la base de datos, el analista debe restaurarla antes de que otro caso de prueba sea ejecutado.

- Acciones: Pasos a realizar para completar la prueba. Descripción de los datos de entrada

-------------------------
Resultados

- Salida esperada: Contiene una descripción de lo que el analista debería ver tras haber completado todos los pasos de la prueba.

- Salida obtenida: Contiene una breve descripción de lo que el analista encuentra después de que los pasos de prueba se hayan completado.

- Resultado: Indica el resultado cualitativo de la ejecución del caso de prueba, a menudo con un Correcto/Fallido.

- Severidad: Indica el impacto del defecto en el sistema: Grave, Mayor, Normal, Menor.

- Evidencia: En los casos que aplica, contiene información, bien un link al print de pantalla (screenshot), bien una consulta a una base de datos, bien el contenido de un fichero de trazas, donde se evidencia la salida obtenida.

- Seguimiento: Si un caso de prueba falla, frecuentemente la referencia al defecto implicado se debe enumerar en esta columna. Contiene el código correlativo del defecto, a menudo corresponde al código del sistema de tracking de bugs que se esté usando.

- Estado: Indica si el caso de prueba está: No iniciado, En curso, o terminado.

*/