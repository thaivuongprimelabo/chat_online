import React, { Component } from 'react';
import * as constants from '../constants/Commons';

export default class MessageItem extends Component {
    render() {
        var { message } = this.props;
        var name = constants.IS_ME_TEXT;
        var classNameItem = 'message-chat-box iam';
        if(message.type === constants.IS_FRIEND) {
            classNameItem = 'message-chat-box client';
            name = this.props.message.name;
        }

        var messageContent = <p>{ message.content }</p>;
        if(message.type_message === 1) {
            var src = 'http://chat.local/' + message.content;
            messageContent = <ul id='group-file'>
                                <li><a href="javascript:void(0)"><img src={src} width="60" height="60" /></a></li>
                            </ul>
        }
        return (
            <li>
                <span className="author">{ name }, { this.props.message.created_at }</span>
                <div className={ classNameItem }>
                   {messageContent}
                </div>
            </li>
        )
    }
}