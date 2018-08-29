import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.ADD_USER_ONLINE_TO_LIST:
            state = [];
            state = action.users;
            localStorage.setItem('user_online_list', JSON.stringify(action.users));
            return [...state];
		default:
			return state;
    }
    return state;
}

export default myReducer;