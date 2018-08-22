import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

class Room extends Component {

    componentWillMount() {
    }
    
    componentDidMount() {
        var { auth } = this.props;
        if(typeof auth.userInfo.id === 'undefined') {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <Main mainclass={'container'}>
                <p className="text-center login_ttl"><b>Room</b></p>
                <div className="row login_card">
                    <div className="card col-md-4">
                        <span>User Online</span>
                        <ul className="login_otherservice">
                            <li><a href="#">Le Giang</a></li>
                            <li><a href="#">Hoang Le</a></li>
                        </ul>
                    </div>
                    <div className="card col-md-8">
                        <span>Talk to Le Giang:</span>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <div id="content">
                                <ul className="content-box">
                                    <li>
                                        <span className="author">Vuong luu, 2018-08-22 2:24PM</span>
                                        <div className="message-chat-box iam">
                                            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="author">Le Giang, 2018-08-22 2:24PM</span>
                                        <div className="message-chat-box client">
                                            <p>BBBBBBBBBBBBBBBBBBBBBBBBBBBBB</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="author">Vuong luu, 2018-08-22 2:24PM</span>
                                        <div className="message-chat-box iam">
                                            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="author">Le Giang, 2018-08-22 2:24PM</span>
                                        <div className="message-chat-box client">
                                            <p>BBBBBBBBBBBBBBBBBBBBBBBBBBBBB</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <textarea id="message" className="form-control" rows={'2'} style={{ marginBottom: '5px' }}></textarea>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this.doLogin }>Send</button>
                        </div>
                    </div>
                </div>
            </Main>
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);