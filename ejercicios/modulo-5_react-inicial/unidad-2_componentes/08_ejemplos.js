/* Ejemplo

A los componentes realizados anteriormente, se le debe pasar como parámetro la información a mostrar…

    ● IMG: la dirección de la imagen (componente imagen)
    ● Title: el título a mostrar (componente título)
    ● Description: la descripción a mostrar (componente descripción)*/

<div className="App">
    <PrimerComponente name="Juan Carlos" />
    <PrimerComponente name="Maria" />
    <PrimerComponente name="Gerardo" />
</div>

// Todo comienza por un vector...

var vectorNombres = [
    'Juan Carlos',
    'Maria',
    'Gerardo'
]

// Opcion 1: uso de array.forEach

var respuesta = [];
vectorNombres.forEach(unItem => {
    respuesta.push(<PrimerComponente name={unItem} />)
})
return (
    <div className="App">
        {respuesta}
    </div>
);

// Opción 2: uso de array.map()

var vectorNombres = [
    'Juan Carlos',
    'Maria',
    'Gerardo'
]
var respuesta = vectorNombres.map(unItem => {
    return <PrimerComponente name={unItem} />
})
return (
    <div className="App">
        {respuesta}
    </div>
)