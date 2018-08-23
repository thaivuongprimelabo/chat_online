import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'
import { connect } from 'react-redux';

export default class App extends Component {
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