import React from 'react';

// CASO ESPECIAL - SIN ELEMENTO CONTENEDOR
export default class RenderSinContenedor extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello World</td>
            </React.Fragment>
        )
    }
}