import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom'

import MessageItem from '../components/MessageItem';
import UserOnlineItem from '../components/UserOnlineItem';

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

        

        var { messages, userOnline } = this.props;
        var messagesList;
        if(messages.length > 0) {
            messagesList = messages.map((message, index) => {
                return <MessageItem message={message} key={index} />
            });
        }

        var useronlineList;
        if(userOnline.length > 0) {
            useronlineList = userOnline.map((user, index) => {
                return <UserOnlineItem user={user} key={index} />
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
                            <div id="content">
                                <ul className="content-box">
                                    { messagesList }
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
        auth : state.auth,
        messages : state.messages,
        userOnline : state.userOnline
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);