import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        return (
            <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{position:'absolute', right: '10px', top: '10px'}}></i>
        )
    }
}