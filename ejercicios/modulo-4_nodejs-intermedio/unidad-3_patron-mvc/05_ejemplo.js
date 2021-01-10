/* Ejemplo

El ejemplo contiene la implementación vertical de una funcionalidad de una aplicación de
posteos al estilo twitter donde una persona que haya ingresado previamente sus datos al
sistema, puede realizar posteos indicando su nombre, su estado de ánimo y lo que quiera
contar en 240 caracteres.

En app.js queda la lógica de ruteo. Aunque no está representada en la imagen, la función
anónima también debe ser asincrónica y la llamada al controller debe contener el await
correspondiente.


El controller se encarga de verificar la información que será enviada a los services.
Verifica que los datos obtenidos cumplan con la lógica de negocios.

En el service se implementa la lógica de negocios más profunda, se trabaja con los
models y se responde a los controllers. Si fuera requerido realizar cálculos o
transformaciones de datos, aquí sería el lugar donde sucedería.

El modelo realiza las consultas a la base de datos y devuelve la información.

La conexión a la base de datos se realiza en archivo aparte que luego es incluída en los
diferentes modelos.
*/