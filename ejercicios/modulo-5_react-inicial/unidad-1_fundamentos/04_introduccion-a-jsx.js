/* Introducción a JSX

Es una extensión de la sintaxis de JavaScript con la cual se generan las interfaces
gráficas en React.

Es similar a un lenguaje de plantillas (templates) pero que tiene toda el potencial de
JavaScript.

JSX permite “mezclar” código HTML con código JavaScript. Por ejemplo, permite asignar
un fragmento HTML a una variable JavaScript y luego mostrar dicha variable.

Ejemplo */

var variableAMostrar = <h1>Título de la página</h1>;

/* A pesar de parecer código HTML puro lo que está del lado derecho de la asignación, es código JSX, el cual tiene mucho más potencial que el simple código HTML.

También podemos mostrar variables JavaScript dentro del código HTML

Ejemplo */
var curso = 'React inicial - 101';
var variableAMostrar = <h1>Bienvenido al curso {curso}</h1>

/* Este código generará el HTML

<h1>Bienvenido al curso React inicial - 101</h1>

Para mostrar el componente, debemos incluir el mismo dentro de un método render() el cual debe retornar el JSX que se mostrará

Ejemplo

render() {
    var curso = 'React inicial - 101';
    var variableAMostrar = <h1>Bienvenido al curso {curso}</h1>;
    return variableAMostrar;
}

//Y el ejemplo completo del componente es */
import React from 'react';
export default class PrimerComponente extends React.Component {
    render() {
        var curso = 'React inicial - 101';
        var variableAMostrar = <h1>Bienvenido al curso {curso}</h1>
        return variableAMostrar;
    }
}

/* En donde el nombre del componente es PrimerComponente y el mismo mostrará por pantalla (al momento de llamarse)

<h1>Bienvenido al curso React inicial - 101</h1>

// Todo el código JSX debe estar contenido dentro de una etiqueta, entonces si disponemos del siguiente código

<div>
    <p>Uno</p>
</div>
<div>
    <p>Dos</p>
</div>

/* El mismo no es válido en JSX, porque no tenemos un único elemento “padre” sino que
tenemos 2 elementos <div> que agrupan el contenido, lo cual no es válido en JSX.

Por lo que debemos modificar el código a la siguiente forma */

<div>
    <div>
        <p>Uno</p>
    </div>
    <div>
        <p>Dos</p>
    </div>
</div>

// Aquí sí tenemos un único elemento padre, un único <div>*/