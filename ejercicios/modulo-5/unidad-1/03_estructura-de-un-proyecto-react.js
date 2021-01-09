/* Estructura de un proyecto React

El proyecto creado por la aplicación create-react-app es el siguiente

my-app
- README.md
- node_modules
- package.json
- .gitignore
- public
    - favicon.ico
    - index.html
    - manifest.json
- src
    - App.css
    - App.js
    - App.test.js
    - index.css
    - index.js
    - logo.svg
    - serviceWorker.js

En el cual podemos encontrar 2 carpetas principales:
    ● public: en la cual se encuentran los archivos que no son de programación (html,
imágenes)
    ● src: en la cual se encuentra todo nuestro proyecto. Todo aquello que
programaremos en nuestro proyecto (archivos JS con los componentes, archivos
de estilos)

--------------------------------
Descripcion

1) Archivo public/index.html
Es el archivo sobre el cual corre el proyecto React, tiene toda la estructura básica de un
archivo HTML y debemos incorporar todas aquellas etiquetas que NO deseamos que
sean modificadas en nuestro proyecto. El elemento principal que tiene este archivo es un
div cuyo id es root, que es el punto de partida del proyecto React (dentro de este div es
donde se mostrarán todos los componentes React)
<div id="root"></div>

2) Archivo src/index.js
Es el punto de entrada de JavaScript para el proyecto React. Este archivo se encarga de
mostrar el componente App.js en el <div id=”root”></div> del archivo HTML principal
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
La llamada a ReactDOM.render recibe como primer parámetro el componente a mostrar
(App) y como segundo parámetro en qué lugar mostrar dicho elemento (en la etiqueta
html cuyo id sea ‘root’)

3) Archivo src/App.js
Este es el archivo que contiene el componente principal de la aplicación. A partir de este
componente se genera la interfaz de la aplicación (por medio del método render()).
Ejemplo */
import React from 'react';
import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Mi primer aplicación React</h1>
            </div>
        );
    }
}

// Este archivo generará la interfaz de la aplicación, generando el siguiente código HTML que será interpretado por el navegador y most

<div id="App">
    <div className="App">
        <h1>Mi primer aplicación React</h1>
    </div>
</div>

/*
*/