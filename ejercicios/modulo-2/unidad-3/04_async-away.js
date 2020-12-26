/*  Async/Away:
- Supongamos que tenemos una función que realiza una consulta a un servidor externo,
esta operación es del tipo asincrónica, ya que el servidor puede tardar en responder
(JavaScript obliga que todas estas operaciones sean asincrónicas), y debemos mostrar la
respuesta del servidor por consola.
Ejemplo: */

async function realizarPeticionAServidorExterno() {
    var respuesta = await http.get('http://unServer.com');
    return respuesta;
}

/*- La variable respuesta, no será asignada hasta que el servidor no retorne la respuesta.
Para ello, la palabra await, hace que no continúe la ejecución del programa hasta no
recibir la respuesta del servidor.

- Al utilizar await dentro de una función, debemos “marcar” la misma como una función
asincrónica, por ello es que incorporamos, en la definición de la función, antes del nombre
la palabra async.
 */