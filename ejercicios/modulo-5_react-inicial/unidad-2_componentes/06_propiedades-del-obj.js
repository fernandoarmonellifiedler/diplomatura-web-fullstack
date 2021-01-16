/* Acceso a propiedades del objeto en el método

En caso que necesitemos acceder a una propiedad del objeto, dentro del método que es llamado al producirse un evento, no podremos hacer uso de la propiedad this como referencia a la instancia.

Ejemplo */

agregar() {
    this.setState({ name: '' })
}
render() {
    return (
        <div>
            <button onClick={this.agregar}>Agregar</button>
        </div>
    )
}

// El código no es correcto, ya que la sentencia this.setState() dentro del método agregar, no se ejecuta en el mismo contexto que el objeto. Para poder acceder a la propiedad this dentro del método agregar, debemos previamente “enlazarlo” con la instancia. Ejemplo

constructor(props) {
    super(props);
    this.agregar = this.agregar.bind(this);
}
agregar() {
    this.setState({ name: '' })
}
render() {
    return (
        <div>
            <button onClick={this.agregar}>Agregar</button>
        </div>
    )
}

/* Recordemos que el constructor de una clase, es el método que se ejecuta al instanciar la misma, en este caso el método constructor().

En los componentes que heredan de React.Component, el constructor recibe como parámetro las propiedades que le envía el componente padre. Es por ello, que la primer sentencia que debemos ejecutar es super(props), lo que ejecutará el constructor del padre.

La línea siguiente, estamos enlazando el método con la instancia del objeto. Con esta simple línea, ya podemos utilizar this.setState en el método agregar (o cualquier referencia a la instancia dentro del método).

Cada método que deba hacer uso de la instancia (this) debe enlazarse en el constructor por medio de la sintaxis this.<nombre del método> = this.<nombre del método>.bind(this);*/