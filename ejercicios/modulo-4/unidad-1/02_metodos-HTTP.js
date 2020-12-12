/* Métodos HTTP

Peticiones HTTP
La comunicación por medio de HTTP, se centra en el concepto de ciclo de petición-respuesta en la cual el cliente envía una petición y el servidor retorna una respuesta.

Para que la petición del cliente sea válida, debe incluir:
● URL (Uniform Resource Locator)
● Método
● Encabezados
● Cuerpo de la petición

URL
Se convirtió en una forma fácil para que el cliente le indique al servidor con que desea
interactuar, llamado recursos.

Método
El método de la petición (Ej: GET, POST, PUT, DELETE) le indica al servidor que clase de acción desea realizar el cliente sobre el recurso.
● GET: le solicita al servidor que retorne uno o varios recursos.
● POST: le indica al servidor que debe crear un nuevo recurso.
● PUT: le indica al servidor que debe actualizar un recurso existente.
● DELETE: le indica al servidor que borre un recurso.

Encabezados
Proveen información extra en las peticiones. Generalmente utilizado para indicar el formato de respuesta que se espera del servidor (xml, json, html) y enviar datos de
autenticación.

Cuerpo de la petición
Contiene la información que el cliente desea enviar al servidor. Para los métodos POST y PUT, se envía la información con la que el cliente desea crear un recurso (POST) o actualizar un recurso (PUT).

URL         | http://www.miserver.com/personas
Método      | POST
Encabezados | Accept: application/json
Cuerpo de   | Datos de la persona a agregar
la petición

--------------------------------

Respuestas HTTP
La respuesta del servidor ante la petición del cliente, incluye:

● Código de estado (status code)
● Encabezados
● Cuerpo de la respuesta

1) Código de estado
Es un código numérico preestablecido que le indica al cliente el resultado de la operación.
Entre ellos podemos destacar:

● 200 operación realizada de manera correcta (sin errores)
● 201 recurso creado
● 204 recurso borrado
● 400 petición inválida
● 401 sin autorización (el usuario no se ha autenticado)
● 403 no tiene permisos sobre el recurso (se ha autenticado, pero no tiene suficientes permisos para realizar la operación solicitada en el recurso)
● 404 no encontrado
● 500 error interno del servidor

El servidor retorna un único código de estado por respuesta.

2) Encabezados
Información extra que el servidor le entrega al cliente con respecto a la respuesta.

3) Cuerpo de la respuesta
Los datos que retorna el servidor al cliente. Por ejemplo, cuando el cliente le solicita un
recurso, el servidor retorna en el cuerpo de la petición el recurso solicitado.

Código de estado | 200
Encabezados      | Content-type: application/json
Cuerpo de        | Datos
la respuesta
Respuesta HTTP   |

 */