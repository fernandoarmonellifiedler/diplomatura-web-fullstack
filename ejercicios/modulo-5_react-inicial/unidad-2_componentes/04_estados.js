/* Estados

Manejo de estados en la aplicación
En los casos que mostramos una propiedad del componente (en el método render) el mismo se ejecuta una vez de manera predeterminada, al momento de tener que mostrar el componente. En los casos que debemos modificar la propiedad luego de mostrarse el componente, este cambio no se verá reflejado en la interfaz (ya que el método render ya fue llamado).

Para poder reflejar el cambio de una propiedad del componente, debemos hacer uso del estado. El estado es una propiedad especial dentro de los componentes React, las propiedades que figuran en el estado, son aquellas que al ser modificadas fuerzan una actualización de la interfaz. La propiedad de estado en React es state (estado en ingles).
En esta propiedad guardaremos aquellas propiedades que deseamos que al momento de ser modificadas, provoquen un cambio en la interfaz.

Veamos un ejemplo de la propiedad state, que dentro tiene una propiedad fecha */

state = {
    fecha: new Date()
}

/* Al momento de crearse el componente, y la propiedad state, la propiedad fecha (que está dentro de state) toma como valor la fecha actual de la computadora.

La propiedad fecha, por estar dentro de state automáticamente es una propiedad que si cambiamos su valor, generará una actualización de la interfaz (llamada al método render). Pero la forma de realizar el cambio del estado se realiza por medio de la llamada a un método especial setState(). Si nosotros deseamos actualizar la fecha y que la misma se vea reflejada en la interfaz, debemos utilizar el siguiente comando */

this.setState({fecha: new Date()});

/* El método setState recibe como parámetro un objeto JSON, con las propiedades que deseamos cambiar. Si nuestra propiedad state tuviera varios parámetros, podemos cambiar solo uno de ellos llamando a setState({parametroACambiar: nuevoValor}); sin afectar a los demás parámetros.

En React, todo aquello que implique una actualización de la interfaz, debe estar en la propiedad state del componente. */