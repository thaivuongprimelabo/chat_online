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

    constructor(props) {
        super(props);

        var roomId = localStorage.getItem('roomId');
        if(roomId === null) {
            roomId = this.makeRoomId();
            localStorage.setItem('roomId', roomId);
        }

        this.state = {
            roomId : roomId
        }
    }

    makeRoomId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }

    componentDidMount() {
        socket.emit('create', this.state.roomId);
    }

    render() {

        socket.on('is-exists', (res) => {
            if(res.code === constants.CODE_EXISTS) {
                alert('Your account is in used by another person');
            } else {
                this.props.doLogin(res.data);
            }
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
        showLoading : state.showLoading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        doLogin : (form) => {
            dispatch(Actions.doLogin(form));
        },
        handleLoginLoading: (status) => {
            dispatch(Actions.updateLoadingStatus(status))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);