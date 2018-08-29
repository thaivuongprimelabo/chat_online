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
    }

    render() {

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
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);