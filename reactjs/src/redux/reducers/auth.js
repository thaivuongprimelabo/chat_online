import * as types from '../actions/actionTypes';

var initialState = {
	userInfo : []
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.UPDATE_AUTH_STATE:
			state.userInfo = action.userInfo;
			return { ...state}
		default:
			return state;
    }
    return state;
}

export default myReducer;