import React from 'react';

export default class Componente extends React.Component {
    /*
    render() {
        return (
            <div>
                <h1>{this.props.compTitle}</h1>
                <p>{this.props.compDescr}</p>
                <img src={this.props.compUrl} />
            </div>
        );
    }
    */
    render() {
        return (
            <div className="comp">
                <div className="div-comp-text">
                    <h1>{this.props.compTitle}</h1>
                    <p>{this.props.compDescr}</p>
                </div>
                <div className="div-comp-img">
                    <img src={this.props.compUrl} />
                </div>
            </div>
        );
    }
}