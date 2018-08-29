import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom'

import MessageItem from '../components/MessageItem';
import UserOnlineItem from '../components/UserOnlineItem';
import Loading from '../components/Loading';

import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import * as constants from '../constants/Commons';

import socketIOClient from 'socket.io-client';

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friend_id : 0,
            content : ''
        }
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        this._redirectToLogin(this.props);

        const socket = socketIOClient(constants.SOCKET_HOST);
        socket.emit('get-user-online-list', null);
    }

    componentWillReceiveProps(nextProps) {
        this._redirectToLogin(nextProps);
    }

    _redirectToLogin = (props) => {
        var { auth } = props;
        if(auth.userInfo === null) {
            this.props.history.push('/');
        } else {
            
        }
    }

    _sendMessage = () => {
        var { auth } = this.props;
        var message = {
            user_id : auth.userInfo.id,
            room_id : null,
            friend_id : this.state.friend_id,
            content : this.state.content
        }

        const socket = socketIOClient(constants.SOCKET_HOST);
        socket.emit('add-message', message);
    }

    _setFriendId = (friend_id) => {
        this.setState({
            friend_id : friend_id
        })
    }

    _loadUserList = (users) => {
        var { auth } = this.props;
        var length = users.length;
        if(length > 0 && auth.userInfo !== null) {
            for(var i = 0; i < length; i++) {
                var item = users[i];
                if(item.id === auth.userInfo.id) {
                    users.splice(i, 1);
                    break;
                }
            }
        }

        return users;
    }

    render() {
        const socket = socketIOClient(constants.SOCKET_HOST);

        socket.on('add_message_to_list', (msg) => {
            this.props.addMessage(msg);
        });

        socket.on('set-user-online-list', (data) => {
            var users = this._loadUserList(data);
            this.props.addUserOnline(users);
        });

        var { messages, userOnline, showLoading } = this.props;
        var messagesList;
        var spinner;
        if(messages.length > 0) {
            messagesList = messages.map((message, index) => {
                return <MessageItem message={message} key={index} />
            });
        }

        if(showLoading) {
            spinner = <Loading />;
        }

        var useronlineList;
        if(userOnline.length > 0) {
            useronlineList = userOnline.map((user, index) => {
                return <UserOnlineItem user={user} key={index} setFriendId={ this._setFriendId } />
            });
        }

        return (
            <Main mainclass={'container'}>
                <p className="text-center login_ttl"><b>Room</b></p>
                <div className="row login_card">
                    <div className="card col-md-4">
                        <span>User Online</span>
                        <ul className="login_otherservice">
                            { useronlineList }
                        </ul>
                    </div>
                    <div className="card col-md-8">
                        <span>Talk to Le Giang:</span>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <div id="content" style={{ position: 'relative' }}>
                                { spinner }
                                <ul className="content-box">
                                    { messagesList }
                                </ul>
                            </div>
                            <textarea id="message" className="form-control" rows={'2'} style={{ marginBottom: '5px' }} value={ this.state.content } onChange={(event) => this.setState({ content: event.target.value })}></textarea>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this._sendMessage }>Send</button>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
        messages : state.messages,
        userOnline : state.userOnline,
        showLoading : state.showLoading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addMessage: (message) => {
            dispatch(Actions.addMessage(message));
        },
        addUserOnline: (user) => {
            dispatch(Actions.addUserOnlineToList(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);