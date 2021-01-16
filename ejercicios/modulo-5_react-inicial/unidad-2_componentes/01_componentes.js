/* Concepto de componente

Son fragmentos visuales de la página web que tienen  operaciones muy específicas:
- Mostrar un formulario
- Mostrar un comentario
- Recorrer una lista de comentarios y llamar al componente de Mostrar un comentario

------------------------------
Creación de componentes

Al igual que en NodeJS, utilizamos el Visual Studio Code.

Paso 1
Creamos un archivo con el nombre del componente y como extensión .js

Ejemplo
primerComponente.js

Paso 2
Escribimos el código del componente. A este punto hay que aclarar que ReactJS es muy versátil y
permite armar los componentes basados en funciones o basados en clases (paradigma de
objetos).
En este ejemplo utilizamos clases */

import React from 'react';

export default class PrimerComponente extends React.Component {
    render() {
        const name = 'Juan Perez';
        const element = <h1>Hola {name}</h1>;
        return element;
    }
}

/* Realizamos las importaciones necesarias.
Escribimos el código teniendo en cuenta que se debe tener obligatoriamente un método render
que incluya un return.

En este otro ejemplo utilizamos funciones: */

import PrimerComponente from './PrimerComponente';

function App() {
    return (
        <div className="App">
            <PrimerComponente />
        </div>
    )
}

/* Este es el componente principal (el que se ejecuta inicialmente) donde podemos ver que sigue la
forma del componente anterior: importación y luego en este caso una función que incluye un
return dónde va el código a mostrar.

Se puede visualizar la forma en que se llama a un componente desde otro dentro del return de
esta función. Cada componente importado se incluye como una etiqueta.

<PrimerComponente />

La barra detrás del nombre del componente cierra la etiqueta.

------------------------------
Render

CASO ESPECIAL - SIN ELEMENTO CONTENEDOR
Recordemos que el método render siempre debe retornar el JSX que se genera el
componente. Hasta ahora vimos que para retornar el JSX debíamos incluirlo
necesariamente en una etiqueta HTML, pero en algunos casos podemos no querer
agregar etiquetas extras (ya que pueden no ser necesarias para el componente). En estos casos podemos hacer uso de una etiqueta particular: React.Fragment (envolviendo
nuestro código en esta etiqueta, la cual es solo a los fines de “agrupar” la respuesta, y no generará ninguna etiqueta HTML en particular)
Veamos un ejemplo del método render con esta etiqueta. */

render() {
    return (
        <React.Fragment>
            <td>Hello</td>
            <td>World</td>
        </React.Fragment>
    );
}

// Existe también una versión “resumida” de la etiqueta que podemos utilizar, la cual podemos reemplazar React.Fragment por una etiqueta de apertura y cierre (sin contenido)

render() {
    return (
        <>
            <td>Hello</td>
            <td>World</td>
        </>
    );
}
