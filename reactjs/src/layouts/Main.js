import React, { Component } from 'react'
import Header from '../components/Header'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import BodyPatternCss from '../assets/css/body_pattern1.css'
import StyleCss from '../assets/css/style.css'

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cssClass : 'container'
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className={this.props.mainclass}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}