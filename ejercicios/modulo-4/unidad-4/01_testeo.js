/* Introducción al concepto de testeo

Program testing can be a very effective
way to show the presence of bugs, but it is
hopelessly inadequate for showing their
absence.
– Edsger Dijkstra

-------------------------
Definición de testing

El testing es una de las etapas del ciclo de vida de los sistemas de información y es sumamente importante!
El testing es el proceso de validar y verificar que un programa de software o aplicación cumpla con los requerimientos, funcione como se espera y pueda ser implementado.

Como dijera Dijkstra, el testing será una vía para encontrar los errores en el sistema que realicemos pero NO servirá para garantizar la ausencia de ellos. De hecho, un buen desarrollador debería estar bastante preocupado si al probar el sistema no encuentra algunos cuantos errores.

Por regla general, sistema sin errores, sistema que no ha sido probado o que habiendo sido probado, no se probó correctamente. Por lo tanto, durante el testeo buscaremos encontrar errores, fallos, respuestas incorrectas o inesperadas.

-------------------------
Definiciones

- Validación: ¿estamos construyendo el producto correcto? Consiste en corroborar si el programa satisface las expectativas del cliente/usuario.

- Verificación: ¿estamos construyendo el producto correctamente? Consiste en comprobar
que el programa respeta su especificación.
Casos de testeo: descripción de una prueba atómica, por medio de parámetros de entrada (datos de entrada), condiciones de ejecución (necesarias para preparar el programa para las pruebas) y resultados esperados.

- Set de testeo: conjunto de casos de testeo.

- Bug: Característica no deseada del programa desde el punto de vista del usuario. Puede ser producido por uno o varios defectos del programa.

- Errores: una equivocación que conduce a un resultado incorrecto. Generalmente causada por los desarrolladores, son fallas humanas.

- Fracasos: resultados inesperados en la ejecución de un programa.

- Incidente: condición que viola la especificación de un programa.


Tips
➔ El test debe ser reproducible
➔ No debe haber auto-testeo
➔ Probar casos para condiciones válidas e inválidas
*/