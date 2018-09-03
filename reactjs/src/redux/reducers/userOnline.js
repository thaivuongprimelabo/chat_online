import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.ADD_USER_ONLINE_TO_LIST:
            state = [];
            // if(action.users !== null) {
                state = action.users;
            // }s
            //localStorage.setItem('user_online_list', JSON.stringify(action.users));
            return [...state];
        case types.GET_USER_LIST:
            state = action.users;
        case types.UPDATE_ONLINE_OFFLINE:

            var length = action.userOnlineList.length;
            var length2 = state.length;
            for(var i = 0; i < length; i++) {
                var userOnline = action.userOnlineList[i];
                for(var j = 0; j < length2; j++) {
                    var user = state[j];
                    user.status = constants.OFFLINE;
                    if(userOnline.id === user.id) {
                        user.status = constants.ONLINE;
                    }
                }
            }
            return [...state];
		default:
			return state;
    }
    return state;
}

export default myReducer;