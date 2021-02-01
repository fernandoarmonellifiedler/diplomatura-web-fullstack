/* Concepto de redux

Redux es un patrón de arquitectura de datos que permite manejar el estado de la aplicación de una manera predecible. Está pensado para reducir el número de relaciones entre componentes de la aplicación y mantener un flujo de datos sencillo.
Redux se encarga en cierta manera de desacoplar el estado global de una aplicación web (en Front-End) de la parte visual, es decir los componentes.

--------------------------------
Ventajas del uso de redux

Two way binding
Permite “enlazar” un input a una propiedad del estado, permitiendo que al modificar la propiedad se modifique el input, y al modificar el input se modifique la propiedad */

class Ejemplo extends React.Component {
    state = {
        nombre: ''
    }

    constructor(props) {
        super(props); this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ nombre: e.target.value });
    }

    render() {
        return (
            <div className="row">
                <input type="form" value={this.state.nombre} onChange={this.handleChange} />
            </div>)
    }
}


/* Actualización del estado (lista) */

// Agregar un elemento en la lista
this.setState({
    listado: [
        ...this.state.listado, nuevoElemento]
})

// nuevoElemento es el elemento a agregar
//...this.state.listado crea una copia de la lista

// Borrar un elemento de la lista
const posicion = this.state.listado.findIndex(item => {
    return item.id === id;
})

this.setState({
    listado: [
        ...this.state.listado.slice(0, posicion), ...this.state.listado.slice(posicion + 1),
    ]
})

// slice retorna una copia de la lista

// Actualizar un elemento de la lista
const posicion = this.state.listado.findIndex(item => {
    return item.id === id;
})

this.setState({
    listado: [
        ...this.state.listado.slice(0, posicion), copiarElementoModificado,
        ...this.state.listado.slice(posicion + 1),]
})


/* -----------------------------
Manejo de estado
Cuando la aplicación comienza a ser más grande y compleja, cada vez es más difícil poder manejar el estado Redux es un paquete que nos facilita el manejo del estado en React

Principios
● Todo el estado de la aplicación está guardado es un store
● El estado es de solo lectura (solo se puede actualizar por medio de acciones)
● Los cambios de estados se realizar en funciones (reducers)

Estado guardado en un store
Permite mantener todo el estado en un lugar
Permite persistir el estado en el servidor
Permite restaurar un estado de la aplicación desde el servidor

Actualización del estado
Para actualizar el estado debemos emitir (dispatch) una acción
Generalmente indicamos que acción deseamos realizar y los datos necesarios para realizar dicha acción

Reducers
Son las funciones que reciben
● El estado anterior
● La acción a realizar
● Datos necesarios para realizar la acción
Y actualizan el estado
*/