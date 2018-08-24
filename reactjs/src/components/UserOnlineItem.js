import React, { Component } from 'react';
import * as Commons from '../constants/Commons';
import * as Actions from '../redux/actions/index';

import { connect } from 'react-redux';

class UserOnlineItem extends Component {

    _getMessageList = () => {
        var conditions = {
            user_id : 1,
            friend_id : this.props.user.id
        }
        this.props.getMessageList(conditions);
        this.props.setFriendId(this.props.user.id);
    }

    render() {
        
        return (
            <li>
                <a href="javascript:void(0)" onClick={ this._getMessageList } style={{ position: 'relative' }}>
                    { this.props.user.name }
                    <span style={{ width: '10px', height:'10px', display: 'block', position:'absolute', right:'5px', top:'5px',background: '#42B72A', borderRadius: '50%' }}></span>
                </a>
            </li>
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
        getMessageList: (conditions) => {
            dispatch(Actions.getMessageList(conditions));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOnlineItem);