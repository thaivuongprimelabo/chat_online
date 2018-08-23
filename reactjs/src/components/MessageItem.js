import React, { Component } from 'react';
import * as Commons from '../constants/Commons';

export default class MessageItem extends Component {
    render() {
        var classNameItem = 'message-chat-box iam';
        if(this.props.message.type === Commons.IS_FRIEND) {
            classNameItem = 'message-chat-box client';
        }
        return (
            <li>
                <span className="author">{ this.props.message.name }, { this.props.message.created_at }</span>
                <div className={ classNameItem }>
                    <p>{ this.props.message.content }</p>
                </div>
            </li>
        )
    }
}