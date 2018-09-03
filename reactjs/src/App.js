import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'
import { connect } from 'react-redux';
import * as Actions from './redux/actions/index';
import * as constants from './constants/Commons';
import Utils from './constants/Utils';

class App extends Component {

    constructor(props) {
        super(props);

        // var roomId = localStorage.getItem('roomId');
        // if(roomId === null) {
        //     roomId = Utils.makeRoomId();
        //     localStorage.setItem('roomId', roomId);
        // }

        // this.state = {
        //     roomId : roomId
        // }
    }

    componentDidMount() {
        // socket.emit('create', this.state.roomId);
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