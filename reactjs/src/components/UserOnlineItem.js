import React, { Component } from 'react';
import * as constants from '../constants/Commons';
import * as Actions from '../redux/actions/index';

import { connect } from 'react-redux';

class UserOnlineItem extends Component {

    _getMessageList = () => {

        var { auth, friend, user_id } = this.props;
        
        var conditions = {
            user_id : user_id,
            friend_id : friend.id
        }
        console.log(conditions);
        this.props.getMessageList(conditions);
        this.props.setFriendId(friend.id, friend.name);
    }

    render() {
        var { friend } = this.props;
        var statusCss = styleOffline;
        if(friend.status === constants.ONLINE) {
            statusCss = styleOnline;
        }

        return (
            <li>
                <a href="javascript:void(0)" onClick={ this._getMessageList } style={{ position: 'relative' }}>
                    { this.props.friend.name }
                    <span style={statusCss}></span>
                </a>
            </li>
        )
    }
}

const styleOnline = {
    width: '10px', height:'10px', display: 'block', position:'absolute', right:'5px', top:'5px',background: '#42B72A', borderRadius: '50%'
}

const styleOffline = {
    width: '10px', height:'10px', display: 'block', position:'absolute', right:'5px', top:'5px',background: '#cccccc', borderRadius: '50%'
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMessageList: (conditions) => {
            dispatch(Actions.getMessageList(conditions));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOnlineItem);