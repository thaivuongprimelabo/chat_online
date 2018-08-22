import * as types from '../actions/actionTypes';

var initialState = {
	isLogin : false
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.DO_LOGIN:
            
			break;
		default:
			return state;
    }
    return state;
}

export default myReducer;