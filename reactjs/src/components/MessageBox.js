import React, { Component } from 'react';
import * as Commons from '../constants/Commons';
import * as constants from '../constants/Commons';
import MessageItem from '../components/MessageItem';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(constants.SOCKET_HOST);

class MessageBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content : '',
        }

        if(!socket.hasListeners('add_message_to_list')) {
            console.log('add_message_to_list')
            socket.on('add_message_to_list', (msg) => {
                var user_id = msg.user_id;
                var friend_id = msg.friend_id;
                if(this.props.user_id === user_id || this.props.user_id === friend_id) {
                    this.props.addMessageToList(msg);
                }
            });
        } 
    }

    _sendMessage = () => {
        var message = {
            user_id : this.props.user_id,
            room_id : null,
            friend_id : this.props.friend_id,
            content : this.state.content
        }

        this.props.sendMessageToServer(message);
    }

    _openSendFile = () => {
        $('#send_file').click();
    }

    _doSendFile = () => {
        var file = $('#send_file')[0].files[0];
        var formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', this.props.user_id);
        formData.append('room_id', null);
        formData.append('friend_id', this.props.friend_id);
        this.props.sendFile(formData);
    }

    render() {

        var { messages } = this.props;
        var messagesList;
        if(messages.length > 0) {
            messagesList = messages.map((message, index) => {
                message['type'] = constants.IS_FRIEND;
                if(message.user_id === this.props.user_id) {
                    message['type'] = constants.IS_ME;
                }
                return <MessageItem message={message} key={index} />
            });
        }

        return (
            <div>
                <span>Talk to { this.props.friend_name }:</span>
                <div className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <div id="content" style={{ position: 'relative' }}>
                        <ul className="content-box">
                            { messagesList }
                        </ul>
                    </div>
                    <div>
                        <form method="POST" encType='multipart/form-data'>
                            <a href="javascript:void(0)" onClick={ this._openSendFile }>Gửi file</a>
                            <input type="file" id="send_file" name="send_file" style={{ display: 'none' }} onChange={ this._doSendFile } />
                        </form>
                    </div>
                    <textarea id="message" className="form-control" rows={'2'} style={{ marginBottom: '5px' }} value={ this.state.content } onChange={(event) => this.setState({ content: event.target.value })}></textarea>
                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this._sendMessage }>Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sendMessageToServer: (message) => {
            dispatch(Actions.addMessage(message));
        },
        addMessageToList: (message) => {
            dispatch(Actions.addMessageToList(message, constants.ADD_ONE_MESSAGE))
        },
        sendFile: (file) => {
            dispatch(Actions.sendFile(file));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);