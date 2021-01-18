import React from 'react';

export default class Imagen extends React.Component {

    render() {
        return (
            <div>
                <img src={this.props.src} />
            </div>
        );
    }
}