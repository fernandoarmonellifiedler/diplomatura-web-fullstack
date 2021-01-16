/* Comunicación en entre componentes

Paso de parámetros a componentes
Hasta el momento trabajamos con componentes que siempre muestran el mismo valor, independientemente de su entorno. A partir de ahora comenzaremos a trabajar con componentes que podamos cambiar su comportamiento, similar a los parámetros de las funciones, pero orientado a la visualización y comportamiento de cada componente.

Tomemos como ejemplo la siguiente imagen que muestra del lado izquierdo como se ve el componente Collapsible, y del lado derecho como llamamos a dicho componente para poder cambiar la información que muestra.

Veamos un ejemplo completo de paso de parámetros a un componente. Comencemos con la llamada a un componente llamado PrimerComponente cuya función es mostrar el nombre que le pasamos como parámetro.

La llamada al componente puede ser de la siguiente forma */

<PrimerComponente name="Juancito"/>

/* Como vemos, el paso de un parámetro al componente se realiza por medio del agregado de un atributo “HTML” en la etiqueta del componente que hemos definido.

Luego en el componente, podemos acceder al parámetro por medio de this.props.<nombre del parámetro>. Veamos el ejemplo */

export default class PrimerComponente extends React.Component {
    render () {
        const element = <h1>Hola {this.props.name}</h1>;
        return element;
    }
}

/* El parámetro (atributo) es name, por lo que para poder acceder a dicho parámetro hacemos uso de this.props.name.

Nada nos impide de llamar al componente varias veces en nuestra aplicación, por ejemplo de la siguiente forma */

<div className="App">
    <PrimerComponente name="Juan Carlos"/>
    <PrimerComponente name="Maria"/>
    <PrimerComponente name="Gerardo"/>
</div>

/* De esta forma, se llamará al componente 3 veces, la primera vez el parámetro name tendrá como valor Juan Carlos, la segunda vez Maria, y por último el valor Gerardo.

Eso provocará que el componente se muestre 3 veces en la aplicación.
*/