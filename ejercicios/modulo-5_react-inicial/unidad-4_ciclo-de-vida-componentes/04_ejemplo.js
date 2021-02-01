/* Manejo de campos de formulario

Los formularios son uno de los componentes más utilizados en las páginas web y aplicaciones, son un elemento fundamental para que el usuario pueda cargar información en un sistema. Disponemos de formularios para búsqueda, alta de información,
modificación de información, etc.

En esta sección veremos como podemos asociar un input a un estado, lo que nos permite que el estado refleje el valor del input en todo momento. Y en caso que modifiquemos el estado, el input asociado se actualice automáticamente. Este tipo de enlace (muchas veces llamado two way data binding) es muy habitual cuando deseamos acceder a la
información que ingresa el usuario desde React.

Antes de comenzar con un ejemplo, veamos las consideraciones que debe cumplir este two way binding.
● Debemos tener un estado
● Si modificamos la propiedad en el estado, se debe actualizar el input del formulario
● Si modificamos el input del formulario, se debe actualizar la propiedad en el estado

Ejemplo: Veamos un ejemplo del método render con esta etiqueta. */

class Ejemplo extends React.Component {
    state = {
        nombre: ''
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ nombre: e.target.value });
    }

    render() {
        return (
            <div className="row">
                <input type="form" value={this.state.nombre}
                    onChange={this.handleChange} />
            </div>
        )
    }
}

/*
1. Definimos el state con la propiedad que deseamos mantener el estado
2. Asociamos al input el valor de la propiedad value={this.state.nombre}
3. Al modificar el input, actualizamos el estado onChange={this.handleChange}
4. El evento handleChange() recibe como parámetro el evento que lo dispara (e), y si deseamos acceder al valor ingresado por el usuario, debemos utilizar e.target.value (el valor que ingreso el usuario en este input).
5. Como debemos usar this.setState, para actualizar el estado, en handleChange() debemos realizar el bind en el constructor.


----------------------------
Uso de axios */

import axios from 'axios';
// ...

export default class MiComponente extends React.Component {
    async componentDidMount() {
        var respuesta = await axios.get('https://<server endpoint>');
    }
}


// Verificación del código de respuesta del servidor

var respuesta = await axios.get('');
// ...
respuesta.status


// Acceder a los datos

var respuesta = await axios.get('');
// ...
respuesta.data


// Manejo de la respuesta
state = {
    listado: []
}
async componentDidMount() {

    var respuesta = await
        axios.get('https://jsonplaceholder.typicode.com/comments');
    if (respuesta.status === 200) {
        console.log('ok');
    }
    this.setState({ listado: respuesta.data });
}