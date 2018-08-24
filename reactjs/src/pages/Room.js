import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom'

import MessageItem from '../components/MessageItem';
import UserOnlineItem from '../components/UserOnlineItem';
import Loading from '../components/Loading';

import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friend_id : 0,
            content : ''
        }
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        var { auth } = this.props;
        if(typeof auth.userInfo.id === 'undefined') {
            this.props.history.push('/');
        }
    }

    _sendMessage = () => {
        var { auth } = this.props;
        var message = {
            user_id : auth.userInfo.id,
            room_id : null,
            friend_id : this.state.friend_id,
            content : this.state.content
        }
        this.props.addMessage(message);
    }

    _setFriendId = (friend_id) => {
        this.setState({
            friend_id : friend_id
        })
    }

    render() {
        var { messages, userOnline, showLoading } = this.props;
        var messagesList;
        var spinner;
        if(messages.length > 0) {
            messagesList = messages.map((message, index) => {
                return <MessageItem message={message} key={index} />
            });
        }

        if(showLoading) {
            spinner = <Loading />;
        }

        var useronlineList;
        if(userOnline.length > 0) {
            useronlineList = userOnline.map((user, index) => {
                return <UserOnlineItem user={user} key={index} setFriendId={ this._setFriendId } />
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
                            <div id="content" style={{ position: 'relative' }}>
                                { spinner }
                                <ul className="content-box">
                                    { messagesList }
                                </ul>
                            </div>
                            <textarea id="message" className="form-control" rows={'2'} style={{ marginBottom: '5px' }} value={ this.state.content } onChange={(event) => this.setState({ content: event.target.value })}></textarea>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this._sendMessage }>Send</button>
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
        userOnline : state.userOnline,
        showLoading : state.showLoading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addMessage: (message) => {
            dispatch(Actions.addMessage(message));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);