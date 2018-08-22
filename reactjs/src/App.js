import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'
import { connect } from 'react-redux';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/room" component={Room} />
                    <Route path="/register" component={Register} />
                </div>
            </Router>
        )
    }
}