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
import MessageBox from '../components/MessageBox';

const socket = socketIOClient(constants.SOCKET_HOST);

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friend_id : 0,
            user_id : 0,
            friend_name : '',
            content : '',
            roomId : localStorage.getItem('roomId')
        }
        
        if(!socket.hasListeners('set_user_online_list')) {
            socket.on('set_user_online_list', (res) => {
                if(res.code === constants.CODE_OK) {
                    //var users = this._loadUserList(res.data);
                    this.props.getUserList(res.data, this.state.user_id);
                    //console.log(users);
                    //this.props.addUserOnline(users);
                    //if(users.length > 0) {
                    //    this.props.updateOnlineOffline(users);
                    //}
                    
                }
            });
        }
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        this._redirectToLogin(this.props);

        socket.emit('get_user_online_list',{});
        
        
    }

    componentWillReceiveProps(nextProps) {
        this._redirectToLogin(nextProps);

        // var { userOnline } = nextProps;
        // if(userOnline.length > 0) {
            
        // }
    }

    _redirectToLogin = (props) => {
        var { auth } = props;
        if(auth.userInfo === null) {
            this.props.history.push('/');
        }

        this.setState({user_id: auth.userInfo.id});
    }

    _sendMessage = () => {
        var { auth } = this.props;
        var message = {
            user_id : auth.userInfo.id,
            room_id : null,
            friend_id : this.state.friend_id,
            content : this.state.content
        }

        socket.emit('add_message', message);
    }

    _setFriendId = (friend_id, friend_name) => {
        this.setState({
            friend_id : friend_id,
            friend_name : friend_name
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

        var { messages, userOnline, auth } = this.props;
        var messageBox;
        if(this.state.friend_id !== 0) {
            messageBox = <MessageBox messages={messages} user_id={auth.userInfo.id} friend_id={this.state.friend_id} friend_name={this.state.friend_name} />;
        }

        var useronlineList;
        if(userOnline.length > 0) {
            useronlineList = userOnline.map((user, index) => {
                return <UserOnlineItem friend={user} user_id={auth.userInfo.id} key={index} setFriendId={ this._setFriendId } />
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
                    <div className="card col-md-8">{ messageBox }</div>
                    
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
        },
        getUserList: (userOnlineList, userId) => {
            dispatch(Actions.getUserList(userOnlineList, userId));
        },
        updateOnlineOffline: (userOnlineList) => {
            dispatch(Actions.updateOnlineOffline(userOnlineList));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);