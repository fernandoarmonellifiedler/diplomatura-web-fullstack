import React from 'react';
import Titulo from './titulo';
import Descripcion from './descripcion';
import Imagen from './imagen';

export default class Componente extends React.Component {

    render() {
        return (
            <div className="comp">
                <div className="div-comp-text">
                    <Titulo name={this.props.compTitle} />
                    <Descripcion name={this.props.compDescr} />
                </div>
                <div className="div-comp-img">
                    <Imagen src={this.props.compUrl} />
                </div>
            </div>
        );
    }
}