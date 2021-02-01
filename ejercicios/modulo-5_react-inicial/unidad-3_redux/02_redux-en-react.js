/* Uso de redux en un proyecto React

Pasos en React

Reducer                 Componente
    ↑                       ↑
    └------- index.js ------┘
crea el store         crea el componente y lo enlaza
                      con el store

--------------------------------
Comunicación componente - store

      connect
------------------┐
                  |
                  |  cambio de estado
    ┌-----------  |  <---------------   
    |             |                    Reducer
    |       ┌---  |  --------------->
    ↓       |     |  evento cambio
    Componente    |
                  |
------------------┘


--------------------------------
Implementación de redux en React

Paso 1: Instalación

npm install --save redux
npm install --save react-redux

Paso 2: Crear reducer

src/ContadorReducer.js */

export default function (estado = 0, accion) {
    switch (accion.type) {
        case 'INCREMENTAR':
            return estado + 1;
        case 'DECREMENTAR':
            return estado - 1;
        default:
            return estado;
    }
}


/* Paso 3: Componente inicial

index.js */

// REDUX

import { provider } from 'react-redux';
import { createStore } from 'redux';
import ContadorReducer from './reducers/ContadorReducer'

var store = createStore(ContadorReducer);

ReactDOM.render(
    <Provider store={store}>
        <Contador />
    </Provider>,
    document.getElementById('root'));



/* Paso 4: Agregamos las funciones de mapeo y dispatch */

import { connect } from 'react-redux';

class Contador extends React.Component {
    // ...
}

const mapEstadoProps = (estado) => {
    return {
        estado: estado
    }
}

const mapAccionesAProps = (dispatch) => {
    return {
        onIncrementar: () => dispatch({ type: 'INCREMENTAR' }),
        onDecrementar: () => dispatch({ type: 'DECREMENTAR' })
    }
}

export default connect(mapEstadoProps, mapAccionesAProps)(Contador);


/* 5. Ejemplo
Contador en React con Redux
https://github.com/cursos-utn/react_ejemplos/tree/master/06-redux-contador


Trabajo Práctico
Implementar el contador del ejemplo como proyecto nuevo.
*/