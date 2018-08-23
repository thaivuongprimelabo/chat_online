import React, { Component } from 'react';
import * as Commons from '../constants/Commons';

export default class UserOnlineItem extends Component {
    render() {
        return (
            <li><a href="#">{ this.props.user.name }</a></li>
        )
    }
}