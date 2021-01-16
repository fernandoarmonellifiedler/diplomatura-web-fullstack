/* Eventos

Manejo de eventos en la aplicación
Cuando debemos responder ante acciones del usuario, como la modificación de un campo en un formulario, envío de un formulario, click en un botón, etc. debemos hacer uso de los eventos que nos provee JavaScript.

En el siguiente gráfico podemos apreciar que los datos pueden ser pasados de un componente padre a un componente hijo. Mientras que los eventos pueden ser enviados de un componente hijo a un componente padre.

Data ---------------------------------> 
                        -> Component 
           -> Component 
Component               -> Component 
           -> Component 

     <-------------------------------- Events


Supongamos que deseamos mostrar un mensaje cuando el usuario realiza click sobre un botón, para ello podemos utilizar el siguiente código */

presionoBoton() {
    console.log('Presiono boton');
}

render() {
    return <div>
        {this.props.name}
        <button onClick={this.presionoBoton}>Soy un botón</button>
    </div>
}

/* Veamos el flujo de operaciones en el código:
● Se ejecuta el método render() el cual muestra el valor de la propiedad name, y pone a disposición del usuario un botón para que presione
● Cuando el usuario hace click sobre el botón (evento)
    ○ Se ejecuta la acción especificada en el atributo onClick, en este caso es llamar al método presionoBoton (nótese que no llevan paréntesis en React, es decir, la llamada no es presionoBoton(). En caso de poner paréntesis en atributo onClick, el método presionoBoton se ejecutará al momento de carga de la interfaz (y nosotros deseamos que solo se ejecute cuando el usuario hace click sobre el mismo)
■ El método presionoBoton() solamente muestra el mensaje ‘Presiono botón’ */
