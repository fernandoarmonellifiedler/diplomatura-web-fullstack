import React from 'react';

/*
// 01) componente react utilizando clases
export default class PrimerComponente extends React.Component {
    render() {
        const name = 'Juan Perez';
        const element = <h1>Hola {name}</h1>;
        return element;
    }
}


// 02) componente con parámetros
export default class PrimerComponente extends React.Component {
    render() {
        const element = <h1>Hola {this.props.name}</h1>;
        return element;
    }
}


// 05) componente con estados
export default class PrimerComponente extends React.Component {
    presionoBoton() {
        console.log('Presiono boton');
    }

    render() {
        return <div>
            {this.props.name}
            <button onClick={this.presionoBoton}>Soy un botón</button>
        </div>;
    }
}
*/

// 06) Acceso a propiedades del objeto en el método
export default class PrimerComponente extends React.Component {
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
        );
    }
}