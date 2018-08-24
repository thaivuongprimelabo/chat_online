import * as types from '../actions/actionTypes';

var initialState = {
	isLogin : false
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.CREATE_ACCOUNT:
			return state;
		default:
			return state;
    }
    return state;
}

export default myReducer;