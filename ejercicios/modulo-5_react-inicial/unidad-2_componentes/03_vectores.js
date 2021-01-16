/* Uso de vectores

De manera habitual, no llamaremos a los componentes con datos fijos, sino que utilizaremos información que hemos guardado previamente en un vector.

Supongamos que tenemos el siguiente vector de nombres */

var vectorNombres = [
    'Juan Carlos',
    'Maria',
    'Gerardo'
]

/* Y que deseamos llamar al componente que muestra los nombres (PrimerComponente) para cada uno de los elementos del vector (para mostrar todos los valores).

Disponemos de varias formas de trabajar con este tipo de vectores en JavaScript y React. Presentaremos la forma más popular de realizar esta operación que es mediante el uso del método map que tienen todos los vectores. El método map, permite convertir los elementos de un vector, a otro formato, para el ejemplo que estamos realizando, convertiremos los elementos del vector en componentes React, más precisamente en componentes PrimerComponente, y cada uno de estos componentes recibirán como parámetro el nombre de la persona que debe mostrar. */

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
);

/* Analicemos el código:
● Recorreremos vectorNombres y por cada elemento
    ○ Convertiremos el nombre al componente PrimerComponente pasándole como parámetro el nombre de la persona (elemento del vector)
    ○ Cada elemento del vector nuevo (vector de PrimerComponente) se almacena en la variable respuesta
● Mostramos la variable respuesta (el vector de componentes)*/