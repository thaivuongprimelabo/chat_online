import React, { Component } from 'react';

export default class ErrorElement extends Component {
    render() {
        return (
            <label className="error" >{ this.props.message }</label>
        )
    }
}