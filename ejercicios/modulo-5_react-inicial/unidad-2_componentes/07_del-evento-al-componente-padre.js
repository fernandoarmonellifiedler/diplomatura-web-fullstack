/* Propagación de evento al componente padre

Muchas veces el componente en el cual se produce el evento, no es el componente que realizar una operación sobre el mismo. Tomemos como ejemplo un formulario que debe agregar una tarea en un listado. Si disponemos de la siguiente estructura de componentes

● AppTareas
    ○ Listado
    ○ Formulario

El evento que se produce en el Formulario, no puede actualizar el componente Formulario, por lo que debe propagar el evento al componente padre de los dos
AppTareas, para que este se encargue de notificar al componente Listado.

Veamos como el componente Formulario puede propagar un evento a AppTareas.

Supongamos que el código de AppTareas (simplificado) es el siguiente */

import React from 'react';
import Listado from './Listado';
import Formulario from './Formulario';

export default class AppTareas extends React.Component {
    agregarDesdeFormulario(valor) {
        // Logica de agregar valor
    }
    render() {
        return (
            <div >
                <Listado />
                <Formulario onAgregar={this.agregarDesdeFormulario} />
            </div>
        )
    }
}

// Y el código de Formulario es el siguiente

import React from 'react';
export default class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.agregar = this.agregar.bind(this);
    }
    agregar() {
        const valorAAgregar = 'Prueba';
        this.props.onAgregar(valorAAgregar);
    }
    render() {
        return (
            <div >
                <button onClick={this.agregar}>Agregar</button>
            </div>
        )
    }
}

/* Cuando el usuario hace click sobre el botón del componente Formulario, se sucede el siguiente flujo de eventos.

    1. El usuario hace click sobre el botón
        a. Se dispara el evento onChange
        b. Se llama al método agregar()
        c. El método agregar() llama al método que se haya asignado a props.onAgregar
        d. El evento que se asignó a props.onAgregar es agregarDesdeFormulario(), por lo que se llama a dicho evento.

Habitualmente el método agregarDesdeFormulario() generará un cambio de estado que hará que todos los componentes hijos actualicen sus propiedades (en caso que haga falta) */