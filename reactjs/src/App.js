import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'
import { connect } from 'react-redux';
import * as Actions from './redux/actions/index';
import * as constants from './constants/Commons';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient(constants.SOCKET_HOST);

class App extends Component {

    componentDidMount() {
        var user_online_list = localStorage.getItem('user_online_list');
        if(user_online_list !== null) {
            user_online_list = JSON.parse(user_online_list);
            var user_online_list = this._loadUserList(user_online_list);
            this.props.addUserOnline(user_online_list);
        }
        
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

        socket.on('add_message_to_list', (msg) => {
            this.props.addMessage(msg);
        });

        socket.on('add_user_online', (users) => {
            
            var users = this._loadUserList(users);
            this.props.addUserOnline(users);
        });
        

        return (
            
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/room" component={Room} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
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

export default connect(mapStateToProps, mapDispatchToProps)(App);