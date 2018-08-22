import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';

class Header extends Component {
    render() {
        var { auth } = this.props;
        var leftTopMenu;
        if(typeof auth.userInfo.id !== 'undefined') {
            leftTopMenu = <ul className="navbar-nav my-2 my-lg-0">
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ auth.userInfo.name }</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown01" styles={{ left: '-70px !important' }}>
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <Link className="dropdown-item" to="/">Logout</Link>
                                </div>
                            </li>
                        </ul>
        }
        return (
            <header>
		        <nav className="navbar navbar-expand-md navbar-dark nav_bgcolor">
                <a className="navbar-brand" href="#">Chat Room</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar" aria-controls="Navbar" aria-expanded="false" aria-label="ナビゲーションの切替">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="Navbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="../lesson/index.html" target="_blank">&nbsp;</a>
                            </li>
                        </ul>
                        { leftTopMenu }
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);