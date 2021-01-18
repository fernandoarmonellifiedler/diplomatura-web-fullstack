import React from 'react';

export default class Descripcion extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
            </div>
        );
    }
}