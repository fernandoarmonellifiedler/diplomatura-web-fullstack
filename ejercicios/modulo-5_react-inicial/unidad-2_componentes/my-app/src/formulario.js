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
        return(
            <div>
                <button onClick={this.agregar}>
                    Agregar
                </button>
            </div>
        )
    }
}